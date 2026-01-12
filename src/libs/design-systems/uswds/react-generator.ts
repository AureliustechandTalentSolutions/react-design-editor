import { USWDS_COMPONENT_CATALOG, generateUSWDSImport } from './components';

interface GeneratedUSWDSCode {
	imports: string;
	component: string;
	styles?: string;
}

export function generateUSWDSReactCode(componentName: string, elements: any[]): GeneratedUSWDSCode {
	const usedComponents: string[] = [];

	const componentCode = elements
		.map(element => {
			const uswdsComponent = mapToUSWDSComponent(element);
			if (uswdsComponent) {
				usedComponents.push(uswdsComponent.import);
				return renderUSWDSComponent(uswdsComponent, element);
			}
			return null;
		})
		.filter(Boolean)
		.join('\n');

	return {
		imports: generateUSWDSImport(usedComponents),
		component: `
export const ${componentName}: React.FC = () => {
  return (
    <div className="usa-section">
      ${componentCode}
    </div>
  );
};`,
	};
}

function mapToUSWDSComponent(element: any) {
	const typeMap: Record<string, string> = {
		button: 'Button',
		input: 'TextInput',
		select: 'Select',
		checkbox: 'Checkbox',
		radio: 'Radio',
		card: 'Card',
		alert: 'Alert',
		table: 'Table',
		nav: 'PrimaryNav',
		header: 'Header',
		footer: 'Footer',
		modal: 'Modal',
		accordion: 'Accordion',
		breadcrumb: 'Breadcrumb',
	};

	const componentType = typeMap[element.type];
	if (!componentType) return null;

	// Find in catalog
	for (const category of Object.values(USWDS_COMPONENT_CATALOG)) {
		if (category[componentType]) {
			return { ...category[componentType], type: componentType };
		}
	}
	return null;
}

function renderUSWDSComponent(component: any, element: any): string {
	const props = generateProps(component, element);

	if (element.children) {
		return `<${component.type} ${props}>${element.children}</${component.type}>`;
	}
	return `<${component.type} ${props} />`;
}

function generateProps(component: any, element: any): string {
	const propStrings: string[] = [];

	component.props.forEach((prop: string) => {
		if (element[prop] !== undefined) {
			if (typeof element[prop] === 'string') {
				propStrings.push(`${prop}="${element[prop]}"`);
			} else if (typeof element[prop] === 'boolean') {
				if (element[prop]) propStrings.push(prop);
			} else {
				propStrings.push(`${prop}={${JSON.stringify(element[prop])}}`);
			}
		}
	});

	return propStrings.join(' ');
}
