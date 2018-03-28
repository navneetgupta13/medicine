exports.create = {
	properties: {
		first_name: {
			required: true,
			allowEmpty: false,
			type: 'string',
			maxLength: 100,
			messages: {
				required: 'frist name is a required field.',
				allowEmpty: 'frist name should not be empty.',
				type: 'frist name should be of string type.',
				maxLength: 'frist name cannot be longer than 100 characters.'
			}
		},
		last_name: {
			required: true,
			allowEmpty: false,
			type: 'string',
			maxLength: 100,
			messages: {
				required: 'frist name is a required field.',
				allowEmpty: 'frist name should not be empty.',
				type: 'frist name should be of string type.',
				maxLength: 'frist name cannot be longer than 100 characters.'
			}
		},
		email: {
			required: true,
			allowEmpty: false,
			type: 'string',
			maxLength: 100,
			messages: {
				required: 'frist name is a required field.',
				allowEmpty: 'frist name should not be empty.',
				type: 'frist name should be of string type.',
				maxLength: 'frist name cannot be longer than 100 characters.'
			}
		},
		phone: {
			required: true,
			allowEmpty: false,
			type: 'string',
			maxLength: 100,
			messages: {
				required: 'frist name is a required field.',
				allowEmpty: 'frist name should not be empty.',
				type: 'frist name should be of string type.',
				maxLength: 'frist name cannot be longer than 100 characters.'
			}
		},
	},
};
exports.update = {
	properties: {
		id: {
			required: true,
			allowEmpty: false,
			type: 'integer',
			messages: {
				required: 'ID is a required field.',
				allowEmpty: 'ID should not be empty.',
				type: 'ID should be of integer type.',
			}
		},

		name: {
			required: true,
			allowEmpty: false,
			type: 'string',
			maxLength: 512,
			messages: {
				required: 'Name is a required field.',
				allowEmpty: 'Name should not be empty.',
				type: 'Name should be of string type.',
				maxLength: 'Name cannot be longer than 512 characters.'
			}
		},

		description: {
			required: true,
			allowEmpty: false,
			type: 'string',
			messages: {
				required: 'Description is a required field.',
				allowEmpty: 'Description should not be empty.',
				type: 'Description should be of string type.'
			}
		},

		price: {
			required: true,
			allowEmpty: false,
			type: 'number',
			messages: {
				required: 'Price is a required field.',
				allowEmpty: 'Price should not be empty.',
				type: 'Price should be of number type.'
			}
		},
	},
};
exports.remove = {
	properties: {
		email_id: {
			required: true,
			allowEmpty: false,
			type: 'string',
			messages: {
				required: 'Email Id is a required field.',
				allowEmpty: 'Email Id should not be empty.',
				type: 'Email Id should be of string type.',
			}
		},
	},
};
