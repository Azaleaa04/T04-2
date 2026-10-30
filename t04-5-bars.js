/* scale and draw bar chart using linear x-scale and band y-scale */
const createBarChart = (data) => {
    /* svg internal coordinate system used to position/size chart elements */
    const viewW = 500;  /* logical width available for the chart */
    const viewH = 1600; /* logical height available for all bars */

    /* svg rendered size displayed on the webpage */
    const displayW = 640; /* visible width of the svg */
    const displayH = 420; /* visible height of the svg */

    /* create svg inside responsive container */
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .attr("width", displayW)
        .attr("height", displayH)
        .style("border", "1px solid black");

    /* x scale: numeric (count) */
    const xMax = d3.max(data, d => d.count);
    const xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, viewW]);

    /* y scale: categorical band (brand) */
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, viewH])
        .paddingInner(0.2)
        .paddingOuter(0.1);

    /* bind data and draw bars */
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", 0)
        .attr("y", d => yScale(d.brand))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");
};