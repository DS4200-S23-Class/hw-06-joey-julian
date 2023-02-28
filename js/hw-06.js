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

    FRAME1.selectAll("points")  
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

  FRAME2.selectAll("points")  
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
  FRAME3.selectAll(".bar")
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

    // Add brushing
    FRAME2
    .call( d3.brush()                 // Add the brush feature using the d3.brush function
    .extent( [ [0,0], [FRAME_WIDTH, FRAME_HEIGHT] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
  )

// Function that is triggered when brushing is performed
function updateChart() {
  extent = d3.event.selection
  FRAME1.circle.classed("selected", function(d){ return isBrushed(extent, x(d.Sepal_Width), y(d.Petal_Width) ) } )
}

// A function that return TRUE or FALSE according if a dot is in the selection or not
function isBrushed(brush_coords, cx, cy) {
     var x0 = brush_coords[0][0],
         x1 = brush_coords[1][0],
         y0 = brush_coords[0][1],
         y1 = brush_coords[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
}

})