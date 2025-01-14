const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("search")
		.setDescription("Gets details for a movie without adding to servers list.")
		.addStringOption((option) => option.setName("movie").setDescription("Movie name or IMDB link of movie to search for.").setRequired(true)),
	async execute(interaction, main) {
		const movieSearch = interaction.options.getString("movie");

		return main.searchNewMovie(movieSearch, interaction).then(([newMovie]) => {
			//No need for else, searchNewMovie alerts user if no movie found.
			return newMovie && interaction.editReply({ embeds: [main.buildSingleMovieEmbed(newMovie, "Movie Details (Not Added)", true)] });
		}).catch(err => {
			console.error("Search.js", err);
			return interaction.editReply("Something went wrong.");
		});
	}	
};