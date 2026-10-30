/* load csv, convert types, sort, and call createBarChart */
d3.csv("data/tvBrandCount.csv", d => ({
    brand: d.brand,
    count: +d.count
})).then(data => {
    /* sort descending by count */
    data.sort((a, b) => d3.descending(a.count, b.count));

    /* hand off to chart builder */
    createBarChart(data);
}).catch(error => {
    console.error("error loading csv:", error);
});