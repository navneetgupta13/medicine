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
				type: 'number',
				messages: {
					required: 'medicine_id is a required field.',
					allowEmpty: 'medicine_id should not be empty.',
					type: 'medicine_id should be of number type.',
				},
			},
			quantity: {
				required: true,
				allowEmpty: false,
				type: 'number',
				minimum: 1,
				messages: {
					required: 'quantity is a required field.',
					allowEmpty: 'quantity should not be empty.',
					type: 'quantity should be of number type.',
					minimum: 'value of quantity should be greater then 0',
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

