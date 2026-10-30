/* bind csv rows to rect elements and set width/height */
const createBarChart = (data) => {
    /* create svg inside responsive container */
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("viewBox", "0 0 1200 400")
        .style("border", "1px solid black");

    /* bind data to rects and set attributes */
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => {
            console.log(d);
            return `bar bar-${d.count}`;
        })
        .attr("width", d => d.count) /* width relative to count */
        .attr("height", 16);         /* constant bar height */
};