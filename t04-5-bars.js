/* add category and value labels to the bar chart using grouped elements */
const createBarChart = (data) => {
    /* --- sizes (logical vs. display) --- */
    const viewW = 500;
    const viewH = Math.max(220, data.length * 28);
    const displayW = 640;
    const displayH = Math.min(480, data.length * 24 + 40);

    /* --- svg root --- */
    const svg = d3.select(".responsive-svg-container")
        .append("svg")
        .attr("viewBox", `0 0 ${viewW} ${viewH}`)
        .attr("width", displayW)
        .attr("height", displayH)
        .style("border", "1px solid #ccc");

    /* --- scales (from t04-6) --- */
    const xMax = d3.max(data, d => d.count);
    const xScale = d3.scaleLinear()
        .domain([0, xMax])
        .range([0, viewW - 120]); /* leave room for value labels on the right */

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, viewH])
        .paddingInner(0.2)
        .paddingOuter(0.1);

    /* --- old rectangle-only drawing block from t04-6 (commented out for t04-7) --- */
    /*
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => `bar bar-${d.count}`)
        .attr("x", 0)
        .attr("y", d => yScale(d.brand))
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");
    */

    /* --- new in t04-7: group per row (bar + labels move together) --- */
    const labelX = 100;
    const barAndLabel = svg
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    /* --- bar rectangle inside the group --- */
    barAndLabel
        .append("rect")
        .attr("x", labelX)
        .attr("y", 0)
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");

    /* --- category text (left of bar, right-aligned at x=100) --- */
    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", labelX - 8) /* small offset so text doesn't touch the bar */
        .attr("y", yScale.bandwidth() / 2 + 4) /* vertically center in band */
        .attr("text-anchor", "end")
        .style("font-family", "sans-serif")
        .style("font-size", "13px");

    /* --- value text (at the end of each bar) --- */
    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => labelX + xScale(d.count) + 4)
        .attr("y", yScale.bandwidth() / 2 + 4) /* vertically center in band */
        .style("font-family", "sans-serif")
        .style("font-size", "13px");
};