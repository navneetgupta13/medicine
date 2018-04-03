exports.getAreaDataDetail = {
	properties: {
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
	}
};
