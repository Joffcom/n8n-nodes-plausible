import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PlausibleApi implements ICredentialType {
	name = 'plausibleApi';
	displayName = 'Plausible API';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'token',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
		},
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			default: 'https://plausible.io',
		},
		{
			displayName: 'Self Signed Certifiate',
			name: 'selfSigned',
			type: 'boolean',
			default: false,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.token}}',
			},
		},
	};

}
