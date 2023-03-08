import { INodeProperties } from 'n8n-workflow';

export const statsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['stats'],
			},
		},
		options: [
			{
				name: 'Aggregate',
				value: 'aggregate',
				action: 'Get aggregated metrics',
				description: 'Aggregates metrics over a certain time period',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/stats/aggregate',
					},
				},
			},
			{
				name: 'Breakdown',
				value: 'breakdown',
				action: 'Get a breakdown of a sites stats',
				description: 'Break down your stats by a property',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/stats/breakdown',
					},
				},
			},
			{
				name: 'Realtime Visitors',
				value: 'realtimeVisitors',
				action: 'Get current visitors',
				description: 'Returns the number of current visitors on your site in the last 5 minutes',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/stats/realtime/visitors',
					},
					output: {
						postReceive: [
							{
								type: 'set',
								properties: {
									value: '={{ { "visitors": $response.body } }}',
								},
							}
						],
					},
				},
			},
			{
				name: 'Timeseries',
				value: 'timeseries',
				action: 'Get timeseries data',
				description: 'Timeseries data over a certain time period',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/stats/timeseries',
					},
				},
			},
		],
		default: 'realtimeVisitors',
	},
];

export const statsFields: INodeProperties[] = [
	// Shared
	{
		displayName: 'Site ID',
		name: 'site_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['stats'],
				operation: ['aggregate', 'breakdown', 'realtimeVisitors', 'timeseries' ],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'site_id',
			},
		},
		default: 'n8n.io',
		description: 'Domain of your site in Plausible.',
	},
	// Aggregate Optional
	// Custom to Period
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [
					'stats',
				],
				operation: [
					'aggregate',
				],
			},
		},
		options: [
			{
				displayName: 'Period',
				description: 'Period',
				name: 'period',
				type: 'options',
				default: '30d',
				options: [
					{
						name: 'Day',
						value: 'day',
					},
					{
						name: '7 Days',
						value: '7d',
					},
					{
						name: '30 Days',
						value: '30d',
					},
					{
						name: 'This Month',
						value: 'month',
					},
					{
						name: '6 Months',
						value: '6mo',
					},
					{
						name: '12 Months',
						value: '12mo',
					},
					{
						name: 'Custom',
						value: 'custom',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'period',
					},
				},
			},
			{
				displayName: 'Date',
				description: 'Use with Custom - Two ISO-8601 formatted dates joined with a comma',
				name: 'date',
				type: 'string',
				default: '2023-01-01,2023-02-01',
				routing: {
					send: {
						type: 'query',
						property: 'date',
					},
				},
			},
			{
				displayName: 'Metrics',
				description: 'List of metrics to aggregate',
				name: 'metrics',
				type: 'multiOptions',
				default: '',
				options: [
					{
						name: 'Bounce Rate',
						value: 'bounce_rate',
					},
					{
						name: 'Events',
						value: 'events',
					},
					{
						name: 'Pageviews',
						value: 'pageviews',
					},
					{
						name: 'Visit Duration',
						value: 'visit_duration',
					},
					{
						name: 'Visitors',
						value: 'visitors',
					},
					{
						name: 'Visits',
						value: 'visits',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'metrics',
						value: '={{ $value.toString() }}',
					},
				},
			},
			{
				displayName: 'Compare',
				description: 'Compare against the same time length from the previous period',
				name: 'compare',
				type: 'boolean',
				default: false,
				routing: {
					send: {
						type: 'query',
						property: 'compare',
						value: 'previous_period'
					},
				},
			},
			{
				displayName: 'Filters',
				description: 'Whether filter the data, More information on filters can be found <a href="https://plausible.io/docs/stats-api#filtering"> here</a>',
				name: 'filters',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'filters',
					},
				},
			},
		],
	},
	// Timeseries Optional
	// Missing Interval
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [
					'stats',
				],
				operation: [
					'timeseries',
				],
			},
		},
		options: [
			{
				displayName: 'Period',
				description: 'Period',
				name: 'period',
				type: 'options',
				default: '30d',
				options: [
					{
						name: 'Day',
						value: 'day',
					},
					{
						name: '30 Days',
						value: '30d',
					},
					{
						name: '7 Days',
						value: '7d',
					},
					{
						name: 'This Month',
						value: 'month',
					},
					{
						name: '6 Months',
						value: '6mo',
					},
					{
						name: '12 Months',
						value: '12mo',
					},
					{
						name: 'Custom',
						value: 'custom',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'period',
					},
				},
			},
			{
				displayName: 'Date',
				description: 'Use with Custom - Two ISO-8601 formatted dates joined with a comma',
				name: 'date',
				type: 'string',
				default: '2023-01-01,2023-02-01',
				routing: {
					send: {
						type: 'query',
						property: 'date',
					},
				},
			},
			{
				displayName: 'Metrics',
				description: 'List of metrics to aggregate',
				name: 'metrics',
				type: 'multiOptions',
				default: '',
				options: [
					{
						name: 'Bounce Rate',
						value: 'bounce_rate',
					},
					{
						name: 'Pageviews',
						value: 'pageviews',
					},
					{
						name: 'Views per Visit',
						value: 'views_per_visit',
					},
					{
						name: 'Visit Duration',
						value: 'visit_duration',
					},
					{
						name: 'Visitors',
						value: 'visitors',
					},
					{
						name: 'Visits',
						value: 'visits',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'metrics',
						value: '={{ $value.toString() }}',
					},
				},
			},
			{
				displayName: 'Filters',
				description: 'Whether filter the data, More information on filters can be found <a href="https://plausible.io/docs/stats-api#filtering"> here</a>',
				name: 'filters',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'filters',
					},
				},
			},
		],
	},
	// Breakdown Required
	{
		displayName: 'Property',
		name: 'property',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['stats'],
				operation: ['breakdown'],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'property',
			},
		},
		default: 'event:name',
		description: 'Which property to break down the stats by.',
		options: [
			{
				'name': 'event:name',
				'value': 'event:name',
				'description': 'Name of the event triggered',
			},
			{
				'name': 'event:page	',
				'value': 'event:page',
				'description': 'Pathname of the page where the event is triggered',
			},
			{
				'name': 'visit:entry_page',
				'value': 'visit:entry_page',
				'description': 'Page on which the visit session started (landing page)',
			},
			{
				'name': 'visit:exit_page',
				'value': 'visit:exit_page',
				'description': 'Page on which the visit session ended (last page viewed)',
			},
			{
				'name': 'visit:source',
				'value': 'visit:source',
				'description': 'Visit source, populated from an url query parameter tag',
			},
			{
				'name': 'visit:referrer',
				'value': 'visit:referrer',
				'description': 'Raw Referer header without http://, http:// or www',
			},
			{
				'name': 'visit:utm_medium',
				'value': 'visit:utm_medium',
				'description': 'Raw value of the utm_medium query param on the entry page',
			},
			{
				'name': 'visit:utm_source',
				'value': 'visit:utm_source',
				'description': 'Raw value of the utm_source query param on the entry page',
			},
			{
				'name': 'visit:utm_campaign',
				'value': 'visit:utm_campaign',
				'description': 'Raw value of the utm_campaign query param on the entry page',
			},
			{
				'name': 'visit:utm_content',
				'value': 'visit:utm_content',
				'description': 'Raw value of the utm_content query param on the entry page',
			},
			{
				'name': 'visit:utm_term',
				'value': 'visit:utm_term',
				'description': 'Raw value of the utm_term query param on the entry page',
			},
			{
				'name': 'visit:device',
				'value': 'visit:device',
				'description': 'Device type',
			},
			{
				'name': 'visit:browser',
				'value': 'visit:browser',
				'description': 'Name of the browser vendor',
			},
			{
				'name': 'visit:browser_version',
				'value': 'visit:browser_version',
				'description': 'Version number of the browser used by the visitor',
			},
			{
				'name': 'visit:os',
				'value': 'visit:os',
				'description': 'Name of the operating system',
			},
			{
				'name': 'visit:os_version',
				'value': 'visit:os_version',
				'description': 'Version number of the operating system used by the visitor',
			},
			{
				'name': 'visit:country',
				'value': 'visit:country',
				'description': 'ISO 3166-1 alpha-2 code of the visitor country',
			},
			{
				'name': 'visit:region',
				'value': 'visit:region',
				'description': 'ISO 3166-2 code of the visitor region',
			},
			{
				'name': 'visit:city',
				'value': 'visit:city',
				'description': 'GeoName ID of the visitor city',
			},
		],
	},
	// Breakdown Optional
	// Missing Interval
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: [
					'stats',
				],
				operation: [
					'breakdown',
				],
			},
		},
		options: [
			{
				displayName: 'Period',
				description: 'Period',
				name: 'period',
				type: 'options',
				default: '30d',
				options: [
					{
						name: 'Day',
						value: 'day',
					},
					{
						name: '30 Days',
						value: '30d',
					},
					{
						name: '7 Days',
						value: '7d',
					},
					{
						name: 'This Month',
						value: 'month',
					},
					{
						name: '6 Months',
						value: '6mo',
					},
					{
						name: '12 Months',
						value: '12mo',
					},
					{
						name: 'Custom',
						value: 'custom',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'period',
					},
				},
			},
			{
				displayName: 'Date',
				description: 'Use with Custom - Two ISO-8601 formatted dates joined with a comma',
				name: 'date',
				type: 'string',
				default: '2023-01-01,2023-02-01',
				routing: {
					send: {
						type: 'query',
						property: 'date',
					},
				},
			},
			{
				displayName: 'Metrics',
				description: 'List of metrics to aggregate',
				name: 'metrics',
				type: 'multiOptions',
				default: '',
				options: [
					{
						name: 'Bounce Rate',
						value: 'bounce_rate',
					},
					{
						name: 'Events',
						value: 'events',
					},
					{
						name: 'Pageviews',
						value: 'pageviews',
					},
					{
						name: 'Visit Duration',
						value: 'visit_duration',
					},
					{
						name: 'Visitors',
						value: 'visitors',
					},
					{
						name: 'Visits',
						value: 'visits',
					},
				],
				routing: {
					send: {
						type: 'query',
						property: 'metrics',
						value: '={{ $value.toString() }}',
					},
				},
			},
			{
				displayName: 'Filters',
				description: 'Whether filter the data, More information on filters can be found <a href="https://plausible.io/docs/stats-api#filtering"> here</a>',
				name: 'filters',
				type: 'string',
				default: '',
				routing: {
					send: {
						type: 'query',
						property: 'filters',
					},
				},
			},
			{
				displayName: 'Limit',
				description: 'Limit the number of results. Maximum value is 1000. Defaults to 100',
				name: 'limit',
				type: 'string',
				default: '100',
				routing: {
					send: {
						type: 'query',
						property: 'limit',
					},
				},
			},
			{
				displayName: 'Page',
				description: 'Number of the page, used to paginate results. Importantly, the page numbers start from 1 not 0',
				name: 'page',
				type: 'string',
				default: '1',
				routing: {
					send: {
						type: 'query',
						property: 'page',
					},
				},
			},
		],
	},
];
