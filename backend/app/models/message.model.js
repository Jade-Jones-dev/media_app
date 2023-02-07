module.exports = (sequelize, Sequelize) => {
	const Message = sequelize.define(
		"message",
		{
			title: {
				type: Sequelize.STRING,
			},
			body: {
				type: Sequelize.STRING,
			},
		},
		{
			timestamps: false,
		}
	);

	return Message;
};
