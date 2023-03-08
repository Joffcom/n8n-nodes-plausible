import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { siteFields, siteOperations, statsFields, statsOperations } from './descriptions';

export class Plausible implements INodeType {
	description : INodeTypeDescription = {
		displayName: 'Plausible',
		name: 'Plausible',
		icon: 'file:Plausible.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Plausible API',
		defaults: {
			name: 'Plausible',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'plausibleApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.domain.replace(new RegExp("/$"), "")}}',
			skipSslCertificateValidation: '={{ $credentials.selfSigned }}' as unknown as boolean,
			headers: {},
		},
		properties : [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Site',
						value: 'site',
					},
					{
						// eslint-disable-next-line n8n-nodes-base/node-param-resource-with-plural-option
						name: 'Stats',
						value: 'stats',
					},
				],
				default: 'stats',
			},

			...statsOperations,
			...statsFields,
			...siteOperations,
			...siteFields,

		],
	};
}
