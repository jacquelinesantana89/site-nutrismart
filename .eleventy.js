module.exports = function(eleventyConfig) {
  // Passa arquivos e pastas diretamente para a pasta final do site (_site)
  eleventyConfig.addPassthroughCopy("imagens");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy({"static/css": "css"});
  eleventyConfig.addPassthroughCopy({"static/js": "js"});

  // Filtro para formatar datas
  eleventyConfig.addFilter("readableDate", dateObj => {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  });

  // Pega os 3 posts mais recentes para a home page
  eleventyConfig.addCollection("latestPosts", function(collectionApi) {
    return collectionApi.getFilteredByTag("posts").reverse().slice(0, 3);
  });

  return {
    // Define as pastas de entrada e saída
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    // Permite que arquivos .html usem a linguagem de template Nunjucks
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
