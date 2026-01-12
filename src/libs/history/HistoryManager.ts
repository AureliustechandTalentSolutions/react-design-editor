import { v4 as uuid } from 'uuid';

export interface DesignSnapshot {
	id: string;
	timestamp: Date;
	objects: object;
	description: string;
	author?: string;
}

export interface SerializableDesignSnapshot {
	id: string;
	timestamp: string;
	objects: object;
	description: string;
	author?: string;
}

export interface HistoryExport {
	snapshots: SerializableDesignSnapshot[];
	currentIndex: number;
	maxSnapshots: number;
}

export class HistoryManager {
	private snapshots: DesignSnapshot[] = [];
	private currentIndex: number = -1;
	private maxSnapshots: number = 50;

	/**
	 * Save a new snapshot to history
	 */
	public save(objects: object, description: string, author?: string): void {
		// Remove any snapshots after current index (for redo functionality)
		if (this.currentIndex < this.snapshots.length - 1) {
			this.snapshots = this.snapshots.slice(0, this.currentIndex + 1);
		}

		// Create new snapshot
		const snapshot: DesignSnapshot = {
			id: uuid(),
			timestamp: new Date(),
			objects: JSON.parse(JSON.stringify(objects)), // Deep clone
			description,
			author,
		};

		this.snapshots.push(snapshot);
		this.currentIndex++;

		// Enforce max snapshots limit
		if (this.snapshots.length > this.maxSnapshots) {
			const removeCount = this.snapshots.length - this.maxSnapshots;
			this.snapshots = this.snapshots.slice(removeCount);
			this.currentIndex -= removeCount;
		}
	}

	/**
	 * Undo to previous snapshot
	 */
	public undo(): DesignSnapshot | null {
		if (this.currentIndex > 0) {
			this.currentIndex--;
			return this.snapshots[this.currentIndex];
		}
		return null;
	}

	/**
	 * Redo to next snapshot
	 */
	public redo(): DesignSnapshot | null {
		if (this.currentIndex < this.snapshots.length - 1) {
			this.currentIndex++;
			return this.snapshots[this.currentIndex];
		}
		return null;
	}

	/**
	 * Get all snapshots in history
	 */
	public getHistory(): DesignSnapshot[] {
		return this.snapshots.map(snapshot => ({
			...snapshot,
			timestamp: snapshot.timestamp,
		}));
	}

	/**
	 * Restore a specific snapshot by ID
	 */
	public restoreSnapshot(id: string): object | null {
		const index = this.snapshots.findIndex(snapshot => snapshot.id === id);
		if (index === -1) {
			return null;
		}

		this.currentIndex = index;
		return JSON.parse(JSON.stringify(this.snapshots[index].objects));
	}

	/**
	 * Export history to JSON string
	 */
	public export(): string {
		const exportData: HistoryExport = {
			snapshots: this.snapshots.map(snapshot => ({
				...snapshot,
				timestamp: snapshot.timestamp.toISOString(),
			})),
			currentIndex: this.currentIndex,
			maxSnapshots: this.maxSnapshots,
		};
		return JSON.stringify(exportData, null, 2);
	}

	/**
	 * Import history from JSON string
	 */
	public import(data: string): void {
		try {
			const importData: HistoryExport = JSON.parse(data);

			if (!importData.snapshots || !Array.isArray(importData.snapshots)) {
				throw new Error('Invalid history data format');
			}

			// Convert timestamp strings back to Date objects
			this.snapshots = importData.snapshots.map((snapshot: SerializableDesignSnapshot) => ({
				...snapshot,
				timestamp: new Date(snapshot.timestamp),
			}));

			this.currentIndex =
				importData.currentIndex !== undefined ? importData.currentIndex : this.snapshots.length - 1;
			this.maxSnapshots = importData.maxSnapshots || this.maxSnapshots;
		} catch (error) {
			throw new Error(`Failed to import history: ${error}`);
		}
	}

	/**
	 * Clear all history
	 */
	public clear(): void {
		this.snapshots = [];
		this.currentIndex = -1;
	}

	/**
	 * Get current snapshot
	 */
	public getCurrentSnapshot(): DesignSnapshot | null {
		if (this.currentIndex >= 0 && this.currentIndex < this.snapshots.length) {
			return this.snapshots[this.currentIndex];
		}
		return null;
	}

	/**
	 * Check if undo is available
	 */
	public canUndo(): boolean {
		return this.currentIndex > 0;
	}

	/**
	 * Check if redo is available
	 */
	public canRedo(): boolean {
		return this.currentIndex < this.snapshots.length - 1;
	}

	/**
	 * Set maximum number of snapshots to keep
	 */
	public setMaxSnapshots(max: number): void {
		this.maxSnapshots = Math.max(1, max);

		// Trim snapshots if needed
		if (this.snapshots.length > this.maxSnapshots) {
			const removeCount = this.snapshots.length - this.maxSnapshots;
			this.snapshots = this.snapshots.slice(removeCount);
			this.currentIndex = Math.max(0, this.currentIndex - removeCount);
		}
	}

	/**
	 * Get the number of snapshots in history
	 */
	public getSnapshotCount(): number {
		return this.snapshots.length;
	}

	/**
	 * Get a snapshot by index
	 */
	public getSnapshotAt(index: number): DesignSnapshot | null {
		if (index >= 0 && index < this.snapshots.length) {
			return this.snapshots[index];
		}
		return null;
	}
}
