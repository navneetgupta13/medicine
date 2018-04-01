exports.get = {
	properties: {
		name: {
			required: true,
            allowEmpty: false,
            type: 'string',
			maxLength: 100,
			messages: {
				required: 'name is a required field.',
				allowEmpty: 'name should not be empty.',
				type: 'name should be of string type.',
				maxLength: 'name cannot be longer than 100 characters.',
			},
        },
    },
};
