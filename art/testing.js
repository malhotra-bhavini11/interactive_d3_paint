//first we want to deal with the dataset.
//lets read it in 

// Use the modern D3 Promise syntax
d3.csv("artDataset.csv", d3.autotype)
    .then(data => {
        // Data is now successfully loaded and available as 'data' (Array of Objects)
        
        // You MUST place all data access/visualization code INSIDE this block!
        
        // 1. Access the first object (row) in the array
        const firstRow = data[0]; 
        console.log("data", data); 

        // 2. Access the 'Artist' key of the first object
        const Artist = data.Artist;

        // 3. Loop through all data
        data.forEach(d => {
            
            // 'd' represents a single object (row)
            //console.log(`Title: ${d.Title}, Year: ${d.Year}`);
        });

        // 4. (Optional but recommended) Convert numeric columns to actual numbers
        //data.forEach(d => {
            //if (d.Year) d.Year = +d.Year;
            // Repeat for any other columns you intend to use as numbers
        });

        // 5. This is where you would start building your D3 visualization (e.g., scales, axes, elements)
        













































// set the dimensions and margins of the graph
const width = 450
const height = 450

// append the svg object to the body of the page
const svg = d3.select("#main_viz_container")
  .append("svg")
    .attr("width", width)
    .attr("height", width)

// create dummy data -> just one element per circle
const data = [{ "name": "A" }, { "name": "B" }, { "name": "C" }, { "name": "D" }, { "name": "E" }, { "name": "F" }, { "name": "G" }, { "name": "H" }]

d3.csv("artDataset.csv").then(function(data) {
  console.log(data[0]);
});
// Initialize the circle: all located at the center of the svg area
const node = svg.append("g")
  .selectAll("circle")
  .data(data)
  .join("circle")
    .attr("r", 25)
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .style("fill", "#69b3a2")
    .style("fill-opacity", 0.3)
    .attr("stroke", "#69a2b2")
    .style("stroke-width", 4)

// Features of the forces applied to the nodes:
const simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(0.5)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.01).radius(30).iterations(1)) // Force that avoids circle overlapping

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
simulation
    .nodes(data)
    .on("tick", function(d){
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y)
    });

