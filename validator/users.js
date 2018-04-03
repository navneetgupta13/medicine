exports.create = {
	properties: {
		type: {
			required: true,
			allowEmpty: false,
			enum: ['user', 'ngo'],
			maxLength: 100,
			messages: {
				required: 'user type is a required field.',
				allowEmpty: 'user type should not be empty.',
				enum: 'user type should be either \'user\' or \'ngo\'',
				type: 'user type should be of string type.',
				maxLength: 'user type cannot be longer than 100 characters.'
			}
		},
		email: {
			required: true,
			allowEmpty: false,
			format: 'email',
			maxLength: 100,
			messages: {
				required: 'email is a required field.',
				allowEmpty: 'email should not be empty.',
				format: 'wrong email format.',
				maxLength: 'email cannot be longer than 100 characters.'
			}
		},
		phone: {
			required: true,
			allowEmpty: false,
			type: 'number',
			maxLength: 10,
			minLength: 10,
			messages: {
				required: 'phone is a required field.',
				allowEmpty: 'phone should not be empty.',
				type: 'phone should contains only numbers',
				maxLength: 'phone should contains only 10 digits',
				minLength: 'phone should contains only 10 digits',
			}
		},
		pincode: {
			required: true,
			allowEmpty: false,
			type: 'number',
			maxLength: 6,
			minLength: 6,
			messages: {
				required: 'pincode is a required field.',
				allowEmpty: 'pincode should not be empty.',
				type: 'pincode should contains only numbers',
				maxLength: 'pincode should contains only 6 digits',
				minLength: 'pincode should contains only 6 digits',
			}
		},
		country: {
			required: true,
			enum: ['india'],
			messages: {
				required: 'country is a required field.',
				enum: 'country should be india.',
			}
		},
		state: {
			required: true,
			allowEmpty: false,
			type: 'string',
			maxLength: 100,
			messages: {
				required: 'state is a required field.',
				allowEmpty: 'state should not be empty.',
				type: 'state should be of string type.',
				maxLength: 'state cannot be longer than 100 characters.'
			}
		},
		address: {
			required: true,
			allowEmpty: false,
			type: 'string',
			maxLength: 100,
			messages: {
				required: 'address is a required field.',
				allowEmpty: 'address should not be empty.',
				type: 'address should be of string type.',
				maxLength: 'address cannot be longer than 100 characters.'
			}
		},
		password: {
			required: true,
			allowEmpty: false,
			pattern: '^[a-z]+$',
			minLength: 5,
			maxLength: 100,
			messages: {
				required: 'password is a required field.',
				allowEmpty: 'password should not be empty.',
				pattern: 'password should congtains only alphabates',
				minLength: 'password should be atleast 5 characters.',
				maxLength: 'password cannot be longer than 100 characters.'
			}
		},
		name: {
			required: true,
			allowEmpty: false,
			type: 'string',
			maxLength: 100,
			messages: {
				required: 'name is a required field.',
				allowEmpty: 'name should not be empty.',
				type: 'name should be of string type.',
				maxLength: 'name cannot be longer than 100 characters.'
			}
		},
	},
};

exports.update = {
	properties: {
		type: {
			required: false,
			allowEmpty: false,
			enum: ['user', 'ngo'],
			maxLength: 100,
			messages: {
				required: 'user type is a required field.',
				allowEmpty: 'user type should not be empty.',
				enum: 'user type should be either \'user\' or \'ngo\'',
				type: 'user type should be of string type.',
				maxLength: 'user type cannot be longer than 100 characters.'
			}
		},
		email: {
			required: false,
			allowEmpty: false,
			format: 'email',
			maxLength: 100,
			messages: {
				required: 'email is a required field.',
				allowEmpty: 'email should not be empty.',
				format: 'wrong email format.',
				maxLength: 'email cannot be longer than 100 characters.'
			}
		},
		phone: {
			required: false,
			allowEmpty: false,
			type: 'number',
			maxLength: 10,
			minLength: 10,
			messages: {
				required: 'phone is a required field.',
				allowEmpty: 'phone should not be empty.',
				type: 'phone should contains only numbers',
				maxLength: 'phone should contains only 10 digits',
				minLength: 'phone should contains only 10 digits',
			}
		},
		pincode: {
			required: false,
			allowEmpty: false,
			type: 'number',
			maxLength: 6,
			minLength: 6,
			messages: {
				required: 'pincode is a required field.',
				allowEmpty: 'pincode should not be empty.',
				type: 'pincode should contains only numbers',
				maxLength: 'pincode should contains only 6 digits',
				minLength: 'pincode should contains only 6 digits',
			}
		},
		country: {
			required: false,
			enum: ['india'],
			messages: {
				required: 'country is a required field.',
				enum: 'country should be india.',
			}
		},
		state: {
			required: false,
			allowEmpty: false,
			type: 'string',
			maxLength: 100,
			messages: {
				required: 'state is a required field.',
				allowEmpty: 'state should not be empty.',
				type: 'state should be of string type.',
				maxLength: 'state cannot be longer than 100 characters.'
			}
		},
		address: {
			required: false,
			allowEmpty: false,
			type: 'string',
			maxLength: 100,
			messages: {
				required: 'address is a required field.',
				allowEmpty: 'address should not be empty.',
				type: 'address should be of string type.',
				maxLength: 'address cannot be longer than 100 characters.'
			}
		},
		password: {
			required: false,
			allowEmpty: false,
			pattern: /^[a-z]+$/,
			minLength: 5,
			maxLength: 100,
			messages: {
				required: 'password is a required field.',
				allowEmpty: 'password should not be empty.',
				pattern: 'password should congtains only alphabates',
				minLength: 'password should be atleast 5 characters.',
				maxLength: 'password cannot be longer than 100 characters.'
			}
		},
		name: {
			required: false,
			allowEmpty: false,
			type: 'string',
			maxLength: 100,
			messages: {
				required: 'name is a required field.',
				allowEmpty: 'name should not be empty.',
				type: 'name should be of string type.',
				maxLength: 'name cannot be longer than 100 characters.'
			}
		},
	},
};

exports.login = {
	properties: {
		email: {
			required: true,
			// allowEmpty: false,
			// format: 'email',
			// maxLength: 100,
			messages: {
				required: 'email is a required field.',
				allowEmpty: 'email should not be empty.',
				format: 'wrong email format.',
				maxLength: 'email cannot be longer than 100 characters.'
			}
		},
		password: {
			required: true,
			// allowEmpty: false,
			// pattern: /^[a-z]+$/,
			// minLength: 5,
			// maxLength: 100,
			messages: {
				required: 'password is a required field.',
				allowEmpty: 'password should not be empty.',
				pattern: 'password should congtains only alphabates',
				minLength: 'password should be atleast 5 characters.',
				maxLength: 'password cannot be longer than 100 characters.'
			}
		},
	},
};
