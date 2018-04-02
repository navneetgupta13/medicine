exports.create = {
	properties: {
		transaction: {
			required: true,
			allowEmpty: false,
			minItems: 1,
            type: 'array',
			messages: {
				required: 'transaction is a required field.',
				allowEmpty: 'transaction should not be empty.',
				type: 'transaction should be of array type and array item should be an object',
				minItems: 'transaction should contain atleast 1 item and it should be an object.',
			},
        },
		properties: {
			medicine_id: {
				required: true,
				allowEmpty: false,
				type: 'integer',
				messages: {
					required: 'medicine_id is a required field.',
					allowEmpty: 'medicine_id should not be empty.',
					type: 'medicine_id should be of integer type.',
				},
			},
			quantity: {
				required: true,
				allowEmpty: false,
				type: 'integer',
				minimum: 1,
				messages: {
					required: 'quantity is a required field.',
					allowEmpty: 'quantity should not be empty.',
					type: 'quantity should be of integer type.',
					minimum: 'value of quantity should be greater then 0',
				},
			},
			expiry: {
				required: true,
				allowEmpty: false,
				format: 'date',
				messages: {
					required: 'expiry is a required field.',
					allowEmpty: 'expiry should not be empty.',
					format: 'expiry should be in date fromat YYYY-MM-DD',
				},
			}, 
		},
    },
};

exports.detail = {
	properties: {
		transaction_id: {
			required: true,
            allowEmpty: false,
            type: 'integer',
			messages: {
				required: 'transaction_id is a required field.',
				allowEmpty: 'transaction_id should not be empty.',
				type: 'transaction_id should be of integer type.',
			},
        },
    },
};

exports.detailAdd = {
	properties: {
		transaction_id: {
			required: true,
            allowEmpty: false,
            type: 'integer',
			messages: {
				required: 'transaction_id is a required field.',
				allowEmpty: 'transaction_id should not be empty.',
				type: 'transaction_id should be of integer type.',
			},
        },
		medicine_id: {
			required: true,
			allowEmpty: false,
			type: 'integer',
			messages: {
				required: 'medicine_id is a required field.',
				allowEmpty: 'medicine_id should not be empty.',
				type: 'medicine_id should be of integer type.',
			},
		},
		quantity: {
			required: true,
			allowEmpty: false,
			type: 'integer',
			minimum: 1,
			messages: {
				required: 'quantity is a required field.',
				allowEmpty: 'quantity should not be empty.',
				type: 'quantity should be of integer type.',
				minimum: 'value of quantity should be greater then 0',
			},
		},
		expiry: {
			required: true,
			allowEmpty: false,
			format: 'date',
			messages: {
				required: 'expiry is a required field.',
				allowEmpty: 'expiry should not be empty.',
				format: 'expiry should be in date fromat YYYY-MM-DD',
			},
		}, 
    },
};

exports.detailRemove = {
	properties: {
		transaction_detail_id: {
			required: true,
            allowEmpty: false,
            type: 'integer',
			messages: {
				required: 'transaction_detail_id is a required field.',
				allowEmpty: 'transaction_detail_id should not be empty.',
				type: 'transaction_detail_id should be of integer type.',
			},
		},
	}
};
