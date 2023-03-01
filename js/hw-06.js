// Create a Frame
const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

// Create height and width variables
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 


// Create Frame 1
const FRAME1 = d3.select("#vis1")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

const FRAME2 = d3.select("#vis2")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");
                     
const FRAME3 = d3.select("#vis3")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

// Define scale functions that maps our data values 
// (domain) to pixel values (range)
const X_SCALE1 = d3.scaleLinear() 
                    .domain([0, 8]) // add some padding  
                    .range([0, VIS_WIDTH]); 

const Y_SCALE1 = d3.scaleLinear() 
                    .domain([0, 7]) // add some padding  
                    .range([VIS_HEIGHT, 0]); 


// Define scale functions that maps our data values 
// (domain) to pixel values (range)
const X_SCALE2 = d3.scaleLinear() 
.domain([0, 5]) // add some padding  
.range([0, VIS_WIDTH]); 

const Y_SCALE2 = d3.scaleLinear() 
.domain([0, 3]) // add some padding  
.range([VIS_HEIGHT, 0]);

// Define scale functions that maps our data values 
// (domain) to pixel values (range)
const X_SCALE3 = d3.scaleLinear() 
.domain([0, 4]) // add some padding  
.range([0, VIS_WIDTH]); 

const Y_SCALE3 = d3.scaleLinear() 
.domain([0, 60]) // add some padding  
.range([VIS_HEIGHT, 0]);

function color(type) {
    if (type == "setosa") {
        return "green"
    }
    if (type == 1) {
      return "blue"
    }
    if (type == "versicolor") {
        return "orange"
    }
    if (type == 2) {
      return "orange"
    }
    if (type == "virginica") {
        return "blue"
    }
    if (type == 3) {
      return "green"
    }
}

//Read the data
d3.csv("/data/iris.csv").then((data) => {

    var Plot1 = FRAME1.selectAll("points")  // ADDED Plot1
    .data(data) // passed from .then  
    .enter()       
    .append("circle")
      .attr("cx", (d) => { return (X_SCALE1(d.Sepal_Length) + MARGINS.left); }) 
      .attr("cy", (d) => { return (Y_SCALE1(d.Petal_Length) + MARGINS.bottom); }) 
      .attr("r", 3)
      .attr('fill', d => color(d.Species));

  // Add an x axis to the vis  
  FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE1).ticks(10)) 
          .attr("font-size", '10px');
  
  // add y axis to the vis
  FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT - 250) + ")") 
        .call(d3.axisLeft(Y_SCALE1).ticks(10)) 
          .attr("font-size", '10px');

  var Plot2 = FRAME2.selectAll("points")  // ADDED PLOT2
    .data(data) // passed from .then  
    .enter()       
    .append("circle")
      .attr("cx", (d) => { return (X_SCALE2(d.Sepal_Width) + MARGINS.left); }) 
      .attr("cy", (d) => { return (Y_SCALE2(d.Petal_Width) + MARGINS.bottom); }) 
      .attr("r", 3)
      .attr('fill', d => color(d.Species));

  // Add an x axis to the vis  
  FRAME2.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE2).ticks(10)) 
          .attr("font-size", '10px');
  
  // add y axis to the vis
  FRAME2.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT - 250) + ")") 
        .call(d3.axisLeft(Y_SCALE2).ticks(10)) 
          .attr("font-size", '10px');

  const flowers = [1, 2, 3];
  var Plot3 = FRAME3.selectAll(".bar") // ADD PLOT3
        .data(flowers)
        .enter()
        .append("rect")                   
            .attr("x", (d) => { return (X_SCALE3(d) + MARGINS.left - 25); })
            .attr("y", (d) => { return (MARGINS.bottom + 50); })
            .attr("width", 50)
            .attr("height", (d) => { return (Y_SCALE3(1) - 45); })
            .attr('fill', d => color(d))
        
    // Add an x axis to the vis
    FRAME3.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE3).ticks(3)) 
        .attr("font-size", '10px');
          
    // add y axis to the vis
    FRAME3.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT - 250) + ")") 
        .call(d3.axisLeft(Y_SCALE3).ticks(10)) 
        .attr("font-size", '10px');



    // brushed scatterplot resource: https://observablehq.com/@d3/brushable-scatterplot
    FRAME2
      .call( d3.brush()                 // Add the brush feature using the d3.brush function
        .extent( [ [50,50], [FRAME_WIDTH, FRAME_HEIGHT - 50] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("start brush", brushed) // Each time the brush selection changes, trigger the 'updateChart' function
      )

    function brushed({selection})  {
      if (selection) {
        const [[x0, y0], [x1, y1]] = selection;
        value = Plot2
          .style("stroke", "none") // Initial stroke of non-selected circles
          .style("opacity", 0.5)
          .filter(d => x0 <= (X_SCALE2(d.Sepal_Width) + MARGINS.left) && 
          (X_SCALE2(d.Sepal_Width) + MARGINS.left) < x1 && y0 <= (Y_SCALE2(d.Petal_Width) + MARGINS.bottom) && 
          (Y_SCALE2(d.Petal_Width) + MARGINS.bottom) < y1) // filter sets the size of the selected box and that selected points align with user selection.
          .style("stroke", "red")
          .style("opacity", 1)
          .data();

        value = Plot1
          .style("stroke", "none") // Initial stroke of non-selected circles
          .style("opacity", 0.5)
          .filter(d => x0 <= (X_SCALE2(d.Sepal_Width) + MARGINS.left) && 
          (X_SCALE2(d.Sepal_Width) + MARGINS.left) < x1 && y0 <= (Y_SCALE2(d.Petal_Width) + MARGINS.bottom) && 
          (Y_SCALE2(d.Petal_Width) + MARGINS.bottom) < y1) // filter sets the size of the selected box and that selected points align with user selection.
          .style("stroke", "orange")
          .style("opacity", 1)
          .data();

        value = Plot3
          .style("stroke", "none") // Initial stroke of non-selected bars
          .filter(d => x0 <= (X_SCALE2(d.Sepal_Width) + MARGINS.left) && 
          (X_SCALE2(d.Sepal_Width) + MARGINS.left) < x1 && y0 <= (Y_SCALE2(d.Petal_Width) + MARGINS.bottom) && 
          (Y_SCALE2(d.Petal_Width) + MARGINS.bottom) < y1) // filter sets the size of the selected box and that selected points align with user selection.
          .style("stroke", "orange")
          .data();

      }

    }

})