import { INodeProperties } from 'n8n-workflow';

export const siteOperations: INodeProperties[] = [
	{
		displayName: 'Currently, this API is in private preview and therefore it\'s not possible to acquire an API key through the dashboard. Please contact Plausible to get an udpated API key.',
		name: 'notice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['site'],
			},
		},
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,

		displayOptions: {
			show: {
				resource: ['site'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a site in your plausible account',
				description: 'Creates a site in your Plausible account',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/sites',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a site from your plausible account',
				description: 'Deletes a site from your Plausible account along with all it\'s data and configuration',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/v1/sites/" + $parameter.domain }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a site from your plausible account',
				description: 'Gets a site from your Plausible account',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/v1/sites/" + $parameter.domain }}',
					},
				},
			},
		],
		default: 'get',
	},
];

export const siteFields: INodeProperties[] = [
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		default: 'n8n.io',
		description: 'Domain of the site to use',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['get','delete'],
			},
		},
	},
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		default: 'n8n.io',
		description: 'Domain of the site to use',
		displayOptions: {
			show: {
				resource: ['site'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'domain',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [
					'site',
				],
				operation: [
					'create',
				],
			},
		},
		options: [
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: 'Etc/UTC',
				description: 'Timezone name according to the <a href="https://www.iana.org/time-zones">IANA</a> database. Defaults to Etc/UTC when left blank.',
				routing: {
					send: {
						type: 'body',
						property: 'timezone',
					},
				},
			},
		],
	},
];
