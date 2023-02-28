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
    if (type == "versicolor") {
        return "orange"
    }
    else {
        return "blue"
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
            .attr("x", (d) => { return (X_SCALE3(d) + MARGINS.left); })
            .attr("y", (d) => { return (MARGINS.bottom - Y_SCALE3(50)); })
            .attr("width", 10)
            .attr("height", (d) => { return (Y_SCALE3(50)); })
        
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

})