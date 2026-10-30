/* stub: will draw chart in t04-5 */
function createBarChart(data) {
    console.log("createBarChart received", data.length, "rows");
}

/* load csv, convert types, and run console checks */
d3.csv("data/tvBrandCount.csv", d => ({
    brand: d.brand,
    count: +d.count
})).then(data => {
    /* quick data checks */
    console.log(data);
    console.log("rows:", data.length);
    console.log("max:", d3.max(data, d => d.count));
    console.log("min:", d3.min(data, d => d.count));
    console.log("extent:", d3.extent(data, d => d.count));

    /* sort descending by count */
    data.sort((a, b) => d3.descending(a.count, b.count));

    /* hand off to chart builder stub */
    createBarChart(data);
}).catch(error => {
    console.error("error loading csv:", error);
});