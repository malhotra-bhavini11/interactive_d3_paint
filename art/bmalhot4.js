//first we have to est the palette on the screen and size acc
//process: used procreate, drew paltte, kept bg trans otherwise issue
//issue resolved: if i was using palette without trans bg, white box would show up since its a png
//that was looking really bad against the bg
const VISUAL_WIDTH = 1500; // def wid of palette img
const VISUAL_HEIGHT = 1500; //def height of palette img
//issue: size of blobs, blobs had to big enough to look good on palette and be clickable for user 
// but not overlap esp the interaction circles for their tooltips
const BLOB_IMG_SIZE = 900; //def blob size
//what i had done earlier was make the stroke red in css so i could see the positioning of the tooltip areas 
//and move my blobs acc
const INTERACTION_RADIUS = 70; //def size of interaction circle for tooltip; had to keep right size so it didnt overlap

//ok so now we want to def the coordinates
//im basically hardcoding the coords to place elements in pal view
//rel to center of svg
const PAINT_LOCATIONS = [
    { x: -378, y: -552 }, { x: -154, y: -541 }, { x: 205, y: -348 },
    { x: 306, y: 4 }, { x: -496, y: -258 }, { x: -419, y: -36 }
]; // after a LOT of trial and error was able to land on these coords for pos of blob pngs

// ok so i first drew a full palette, then i isolated the blobs into layers
//what this did basically was that the blob wasnt in the center of the img, pls look at any of col.pngs for ref
//so bsically i hard coded the blobs to be centered so they would work with above lines 
//ref: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Box_model/Introduction
//used figma to get the exact coords of anchor on a img for paint_locations


const BLOB_NUDGES = [
    { x: -240, y: 38 }, { x: -160, y: 170 }, { x: -35, y: 250 },
    { x: 150, y: 320 }, { x: 230, y: 50 }, { x: 260, y: 220 }
];

//ok so now, we're ref to the names of the blob imgs, they're in the same folder as the rest of the files and named scc
const BLOB_IMAGES = ["col1.png", "col2.png", "col3.png", "col4.png", "col5.png", "col6.png"];
//used this site to colorpick from each blob img: https://redketchup.io/color-picker
//then we just put them into an array
const BUBBLE_COLORS = ["#B4A2F4", "#C3DA79", "#EE8F6B", "#6ED1BA", "#DA8CB4", "#7DC2C9"];
//major challenge: as i spoke with prof bryan in office hours, carrying on the theme of the viz was a huge part in the bespoke viz lec
//and huge part of making it custom and fun
//so i decided to make the chart in the shape of paint splatters
//a lot happened here, i first went on pinterest to get the imgs of paint splatters
//when i download them i realized that i needed to use them to def a boundary so any blobs outside of the main splatter body were erased in photo viewer
// then i had to convert these imgs to svg paths
// i used this site: https://www.adobe.com/express/feature/image/convert/jpg-to-svg
//i was mildly successful, initially i wanted different svg paths/splatter hspes for each movement/blob but there were issues with the fill or it not rendering properly
//in the end, i think it was the first svg path that rendered best so i set that as the master path
const MASTER_PATH = "M146.500000,59.500000 C144.037384,60.198326 141.575256,60.652725 139.459381,62.452240 C133.647507,67.395111 123.708763,66.044334 120.324493,57.570091 C118.116104,52.040245 117.169510,45.972111 113.529991,40.978146 C108.072685,33.489910 99.164627,31.071890 91.958107,34.921574 C88.497452,36.770233 87.047119,39.206615 86.948692,42.998669 C86.840385,47.171177 86.433487,51.344475 85.971542,55.496834 C85.519203,59.562943 82.569550,61.240871 78.995773,61.979565 C71.570793,63.514317 64.673859,61.580666 58.005207,58.488773 C55.131386,57.156334 52.075394,56.221294 48.996281,56.082550 C42.058350,55.769928 38.073994,59.856911 37.911613,63.996532 C37.731449,68.589546 40.345890,72.141914 48.003075,72.971619 C51.661133,73.367996 55.310375,72.957199 59.045666,73.796852 C62.129257,74.490005 63.535862,76.179184 64.421883,78.529449 C65.360611,81.019531 62.917122,82.221107 61.446472,83.435158 C59.322395,85.188637 56.968063,86.818565 54.450615,87.883224 C52.883610,88.545929 51.778484,89.562157 50.469860,90.455864 C48.695107,91.667923 48.559162,93.529228 49.108704,94.958191 C49.996941,97.267845 52.491093,97.589821 54.464046,96.897537 C56.783798,96.083565 58.916428,94.886612 61.500687,94.981232 C66.016869,95.146591 68.432571,98.894386 65.924171,102.446449 C63.969753,105.214035 61.454170,107.627785 58.974300,109.972824 C54.133041,114.550858 50.499035,119.659187 49.416107,126.486694 C48.772346,130.545380 49.816784,135.687607 52.499996,137.500000 C54.781609,139.041122 60.155483,137.843338 62.972733,134.973236 C64.460205,133.457870 66.072723,131.841187 66.885254,129.950684 C67.690239,128.077728 68.838638,126.487167 70.068291,125.058792 C72.379257,122.374374 74.838020,119.061226 78.974815,120.100266 C83.051804,121.124283 83.670036,124.643890 84.192093,128.473816 C84.516266,130.852066 85.323280,133.586487 87.466125,135.537201 C90.563881,138.357208 94.576874,139.282486 97.409286,136.410538 C104.346199,129.376801 110.769341,130.616684 118.101311,135.858276 C122.077095,138.700546 127.491798,139.573959 131.912384,136.857437 C136.827621,133.836945 138.215973,128.885651 137.108948,122.979576 C136.206726,118.166176 134.387268,113.556816 134.398438,108.499779 C134.408676,103.855652 136.643631,101.216423 140.513657,99.531380 C142.097733,98.841660 143.804352,98.226059 145.504883,98.046188 C154.059265,97.141380 158.398682,90.476799 158.891983,80.994377 C159.089050,77.206223 159.260498,73.399239 158.182388,69.450203 C156.515610,63.344864 152.951355,60.320175 147.000000,59.500000";
//the only thing i did is i sometimes flipped/rotated the svgs so they looked a bit diff
const SPLATTER_PATHS = Array(6).fill(MASTER_PATH); //each movement can access the path
//used Array(N).fill(value) bc otherwise string was just TOO long


//now that i've def the global var
//lets get into the data loading + proc
//ref: https://observablehq.com/@sandraviz/d3-csv
d3.csv("artDataset.csv").then(raw_data => { //ref: https://www.w3schools.com/js/js_promise.asp; so only executes after loaded
    //ref: https://www.freecodecamp.org/news/dom-manipulation-in-vanilla-js-2036a568dcd9/
    //ref: https://medium.com/@alexsterrantino/vanilla-js-and-dom-manipulation-refresher-3e54b40039fd
    //ref: https://blog.logrocket.com/patterns-efficient-dom-manipulation-vanilla-javascript/
    document.getElementById("loading").style.display = "none"; //fetch csv file, parse into js array rawdata
    // just used document.getElementById (vanilla js) to get element with id loading, to hide
    //used let bc its value needs to change later
    let currentActiveMovement = null; //tracks which movement sel rn in splatter/bubble view

    const counts = {};
    raw_data.forEach(d => { if (d.movement) counts[d.movement.trim()] = (counts[d.movement.trim()] || 0) + 1; });
    // there are more movements in this dataset than i og thought
    //ref: https://www.w3schools.com/js/js_array_methods.asp
    //so i want to get an array of all moveent names using Object.keys(counts)
    //then use .sort() ,ethod to sort in desc order
    //use only top 5 using .slice() method
    const topMovements = Object.keys(counts).sort((a, b) => counts[b] - counts[a]).slice(0, 5);
    //this accounts for 5 out 6 movements that i wanted to appear in the pal view
    //adding others category to array using ... to merge
    //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    //ref: https://www.w3schools.com/howto/howto_js_spread_operator.asp
    const finalMovementsList = [...topMovements, "Others"];
    // base code: d3.scaleOrdinal(range).domain(domain)
    //ref: https://d3js.org/d3-scale/ordinal
    //just altered to map bubble color to the 6 categories
    const colorScale = d3.scaleOrdinal(BUBBLE_COLORS).domain(finalMovementsList);


    //rn the data is in str, into int
    //ref: https://observablehq.com/@stuartathompson/the-difference-between-d3-nest-d3-map-and-data-map
    //use .map() to iterate over raw data array to clean it
    const data = raw_data.map((d, i) => {
        //ref: https://www.w3schools.com/js/js_regexp.asp for how i used .replace 
        let cleanPrice = d.price ? parseFloat(d.price.replace(/[^\d]/g, '')) : 0; //rn price uses . instead of commas which i find weird personally
        //basically i just removed all non digit characters (/[^\d]/g) and converted to floating point nm
        //get 4 digit seq (/\d{4}/)  -> int
        //ref: https://www.w3schools.com/js/js_regexp.asp same link but its also for how i used .match
        let cleanYear = d.yearCreation ? parseInt(d.yearCreation.match(/\d{4}/)) : null;
        //check if raw movement = top movement, yes-> use name
        //no then put into others
        let rawMov = d.movement ? d.movement.trim() : "Unknown"; //ref: https://www.w3schools.com/js/js_if_ternary.asp for synatx
        let finalMov = topMovements.includes(rawMov) ? rawMov : "Others";
        let cleanArtist = d.artist ? d.artist.trim() : "Unknown"; //return cleaned obj
        //ref: https://www.w3schools.com/jsref/jsref_filter.asp for how i used the .filter() method
        return { id: i, title: d.title, artist: cleanArtist, movement: finalMov, price: cleanPrice, year: cleanYear };
    }).filter(d => d.year && d.price > 0); //removes those with price of 0, or without year val

    //need to create a scale fn 
    //ref: https://d3js.org/d3-scale/threshold
    //maps artowrk price to bubble radius
    //but have to alsp create the bins
    const priceScale = d3.scaleThreshold().domain([10000, 25000, 50000]).range([12, 25, 45, 75]); //.domain([10000, 25000, 50000]) defs price points where output val changes
    //.range([12, 25, 45, 75]) to map to circle size in leg

    //we want to sel and add the svg cont i created in the html file
    //ref: https://using-d3js.com/01_01_creating_selections.html; used for synatx check/refresher only
    const svg = d3.select("#viz-container").append("svg")
        //ref: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/width
        .attr("width", window.innerWidth).attr("height", window.innerHeight) //setting dim to make sure viz is full screen
        //ref: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/viewBox
        .attr("viewBox", [-window.innerWidth / 2, -window.innerHeight / 2, window.innerWidth, window.innerHeight]);//make center of screen 0,0 instead of top left corner

    //defining vars needed to make viz, link to html file
    const tooltip = d3.select("#tooltip"); //selection of ttoltip def in html page
    const paletteLayer = svg.append("g").attr("class", "palette-layer"); // add var to group transPalette.png and rel elements def in html file
    //issue 2: blobs had to be interacted with, so each had to be a separate png with trans bg as well
    const blobLayer = svg.append("g").attr("class", "blob-layer"); //group for blobs so they can fade at the same time when switching view
    //group for splatter
    //hidden since opacity is 0 & display one
    const splatterLayer = svg.append("g").attr("class", "splatter-layer").style("opacity", 0).style("display", "none"); //when needed appears
    const dataLayer = svg.append("g").attr("class", "data-layer"); //group data bubbles and line connections
    //grouping unseen interaction circles
    const interactionLayer = svg.append("g").attr("class", "interaction-layer"); //interaction circles at top, so no issue for mouse clcik



    //need to append img to bg layer
    //ref: https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/image
    paletteLayer.append("image").attr("href", "transPalette.png") //can be found in folder
        .attr("width", VISUAL_WIDTH).attr("height", VISUAL_HEIGHT)// sets size to 1500x1500 which alr def in html
        //x and y to half -wid or height so img centered
        .attr("x", -VISUAL_WIDTH / 2).attr("y", -VISUAL_HEIGHT / 2);

    //need to create sub group & sep from splatter layer
    //bc need to apply transformations on this so that points will fit the shape
    const splatterGroup = splatterLayer.append("g").attr("class", "splatter-group"); //ref: https://stackoverflow.com/questions/18582935/the-applying-order-of-svg-transforms
    //var which rn has placeholder for path
    const splatterShape = splatterGroup.append("path").attr("class", "splatter-shape").style("stroke", "none"); //stroke none bc outline looks weird


    //
    function enterSplatterMode(selectedGlob) {

        //this fn handles trans from palette view to bubble view
        //ref: https://d3js.org/d3-transition
        //take view and and fade out
        const selectedMovement = selectedGlob.name; //store what user clicks; data obj with name, pos, src
        //need just the movement
        //update global var 
        //in reset fn, needs to access which points selected 
        currentActiveMovement = selectedMovement; //rel to active tracking of movement (for hiding title after chosen)
        //get shape of bg splatter
        const selectedPath = SPLATTER_PATHS[selectedGlob.pathIndex]; // pathind to get corr svg path
        const baseColor = colorScale(selectedMovement); //referring back to color scale to get assc hex code in array

        d3.select("#palette-title").style("opacity", 0); //hiding the pal title in bubble view

        //transition to hide old elements
        //ref: https://d3-graph-gallery.com/graph/interactivity_transition.html
        //ref: https://www.freecodecamp.org/news/css-display-none-and-visibility-hidden-the-difference/
        //ref: https://www.freecodecamp.org/news/the-css-handbook-a-handy-guide-to-css-for-developers-b56695917d11/
        //ref: https://www.youtube.com/watch?v=K1zHa1sAno0&pp=ygUOZDMgYW5pbWF0aW9ucyA%3D
        //ref: https://www.youtube.com/watch?v=C4t6qfHZ6Tw&pp=ygUWYW5pbWF0aW9ucyBkMyB0dXRvcmlhbA%3D%3D
        paletteLayer.transition().duration(500).style("opacity", 0); // opacity 0, title disappears immd; vanish the wooden palette img
        blobLayer.transition().duration(500).style("opacity", 0); // vanish the blobs
        interactionLayer.style("display", "none"); // instantly removes interaction circles that blobs are mapped to 
        //ref: https://www.youtube.com/watch?v=Bt9UMBgFasY&pp=ygUWYW5pbWF0aW9ucyBkMyB0dXRvcmlhbA%3D%3D

        d3.select("#vizLegend").style("display", "block"); //showing leg, chnaging display from none to block in css
        d3.select("#info-panel").style("display", "block").style("opacity", 0).transition().duration(1000).style("opacity", 1); //shows info panel, slight transition
        //fades in
        //dyn styling
        //ref: https://github.com/d3/d3-selection
        //ref: https://stackoverflow.com/questions/15322556/how-to-remove-an-attribute-in-d3-js
        d3.selectAll(".legend-circle").style("background-color", baseColor); // i wanted the circles in leg to match the bg /color of blob/movement
        //loops through every item in leg

        splatterGroup.attr("transform", null);
        splatterShape.attr("d", selectedPath).attr("transform", null); //resets after flipping rotating shape, bg only one path worked out for me 
        splatterLayer.style("display", "block").style("opacity", 0); // insert new svg str in path so bg shape changes

        //now need to move shape so its center is at 0,0 of img
        //ref: https://developer.mozilla.org/en-US/docs/Web/API/Selection/containsNode
        const bbox = splatterShape.node().getBBox(); //get DOM from path
        //ref: https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getBBox
        const pathCenterX = bbox.x + bbox.width / 2; //want smallest rect that encloses shape
        const pathCenterY = bbox.y + bbox.height / 2; //midpoint to get the center of the shape
        //need to fit to the screen properly
        //screen size/largest dim of shape aspect ratio handling so not cut off
        //ref: https://css-tricks.com/transforms-on-svg-elements/
        const scaleFactor = (Math.min(window.innerWidth, window.innerHeight) * 0.95) / Math.max(bbox.width, bbox.height);

        splatterShape.attr("transform", `translate(${-pathCenterX}, ${-pathCenterY})`); // translate rel to 0,0 center, thus negative value 

        //ow we have to flip and rotate the svg path
        //ref: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/scale
        let rotateDeg = 0; let scaleX = 1; let scaleY = 1; //use scale for mirror img
        if (selectedGlob.pathIndex === 1) scaleX = -1; //flip horiz
        if (selectedGlob.pathIndex === 2) rotateDeg = 90;  //rotate 90 deg
        if (selectedGlob.pathIndex === 3) scaleY = -1; //flip vert
        if (selectedGlob.pathIndex === 4) rotateDeg = 180; //rotate 180 deg
        if (selectedGlob.pathIndex === 5) { scaleX = -1; scaleY = -1; } //diag

        //how we actually apply transformation to element
        //scaleX/Y is direction
        //ref: https://www.sarasoueidan.com/blog/svg-transformations/
        //ref: https://www.w3schools.com/js/js_string_templates.asp
        splatterGroup.attr("transform", `scale(${scaleFactor * scaleX}, ${scaleFactor * scaleY}) rotate(${rotateDeg})`) //scale factor resizes shape acc to screen size
            .style("fill", baseColor).style("opacity", 0.2); // want to set color of splatter shape to match mvment
        //less opacity so bubbles and text distinct + legible

        splatterLayer.transition().duration(1000).style("opacity", 1); // transition for the bg splatter img

        //show button bc we have to be able to go back to palette view later, then should be visible now
        d3.select("#resetBtn").style("display", "block"); //the display block makes it appear immed

        tooltip.style("opacity", 0); //tooltip needs to be hidden 

        //first we wnat to filter and control data vis
        //array w subset we want to animate
        //issue: otherwise it slowed down the sim a lot
        const activeData = data.filter(d => d.movement === selectedMovement);
        bubbles.filter(d => d.movement === selectedMovement).style("display", "block").transition().duration(800).attr("opacity", 0.9); // if  if dom elements === sel mvment, fade in
        bubbles.filter(d => d.movement !== selectedMovement).style("display", "none").attr("opacity", 0); // if dom elements != sel mvment, hide

        //ref: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
        const samplerCanvas = document.createElement("canvas"); //virtual DOM just because of the built in method
        const ctx = samplerCanvas.getContext("2d");
        //ref: https://developer.mozilla.org/en-US/docs/Web/API/Path2D
        const p2d = new Path2D(selectedPath); //svg path to canvas obj
        // can now do math on it

        //checking position of points
        //since shape is irreg, guess
        //find a random coord in boundary
        activeData.forEach(d => {
            let found = false, attempts = 0;
            while (!found && attempts < 500) { //rejection loop-> keeps goign until 500 tries or reaches sol
                //guess point
                const randX = bbox.x + Math.random() * bbox.width; //generates random x coord within bounding box
                const randY = bbox.y + Math.random() * bbox.height; //generates random y coord within bounding box
                //is it in boundary of splatter
                //ref: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath
                if (ctx.isPointInPath(p2d, randX, randY)) { //test
                    //center rel to 0,0
                    let cx = randX - pathCenterX; //if in path, give true
                    let cy = randY - pathCenterY; // if out of path, false
                    //flip using scale
                    let tx = cx; let ty = cy;
                    tx *= scaleX; ty *= scaleY;
                    //rotation
                    //ref: https://stackoverflow.com/questions/135909/what-is-the-method-for-converting-radians-to-degrees
                    const rad = rotateDeg * (Math.PI / 180); //convert rads to degrees
                    //standard 2d rotation matrix used everywhere
                    let rotX = tx * Math.cos(rad) - ty * Math.sin(rad);
                    let rotY = tx * Math.sin(rad) + ty * Math.cos(rad);
                    //scale so is size acc to screen
                    d.targetX = rotX * scaleFactor;
                    d.targetY = rotY * scaleFactor;
                    found = true;
                }
                attempts++;
            }
            if (!found) { d.targetX = 0; d.targetY = 0; }
            d.x = 0; d.y = 0;
        });

        simulation.force("x", d3.forceX(d => d.targetX).strength(0.12)); //pulls along x axis to point
        simulation.force("y", d3.forceY(d => d.targetY).strength(0.12)); // strength of pull
        simulation.force("charge", d3.forceManyBody().strength(-5)); // so there's repulsion between points & spacing
        //ref: https://d3js.org/d3-force/many-body
        simulation.force("collide", d3.forceCollide().radius(d => priceScale(d.price)).strength(1)); // no overlap since they act like solid obj

        //ref: https://stackoverflow.com/questions/47492323/how-to-layer-d3-force-simulation-nodes-based-on-element-and-not-node-order
        //ref: https://www.npmjs.com/package/d3-force/v/0.2.2
        //ref: https://medium.com/ninjaconcept/interactive-dynamic-force-directed-graphs-with-d3-da720c6d7811
        simulation.nodes(activeData).alpha(1).restart(); //pay attention only to sel 50-200 points in movement
        //frees gpu and is faster
        //alpha is mvmnet in sim
        simulation.on("tick", () => { //loop
            bubbles.filter(d => d.movement === selectedMovement).attr("cx", d => d.x).attr("cy", d => d.y); // calc d.x & d.y
            //copy d.x to c.x and d.y to c.y to move bubble
            updateLines();
        });
    }

    //event obj and art data as circle as obj
    function ArtistTrace(event, clickedData) {
        //ref: https://blog.octoperf.com/d3js-tutorial-mouse-events-handling/
        //ref: https://d3js.org/d3-selection/events
        event.stopPropagation(); // had to include otherwise my details panel was disappearing, that clcik event was also actv

        const panel = d3.select("#detail-panel"); //def var to link to detail panel in html
        const imagePath = `artDataset/image_${clickedData.id + 1}.png`; //def get path for rel artwork using string interpolation, 
        // based on naming convention so clickedData.id + 1
        console.log("Looking for image at:", imagePath); // printing to console to see if any errors

        //need to slect header and give text based on title and artist 
        //ref: https://www.codecademy.com/resources/docs/d3/styling/text; while doing codeacademy course
        panel.select("#panel-title").text(clickedData.title); //for title (on top most)
        panel.select("#panel-artist").text(clickedData.artist); // for artist (below title)


        panel.select("#panel-image") //middle of det panel
            .attr("src", imagePath); // src to img path prev def

        //finishing up with details 
        //link back to html so we have bolded labels and insert data for dets
        //ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select
        panel.select("#panel-details").html(` 
                    <strong>Year:</strong> ${clickedData.year}<br>
                    <strong>Price:</strong> $${clickedData.price.toLocaleString()}<br>
                    <strong>Movement:</strong> ${clickedData.movement}
                `);

        //use class manipualtion to show panel like outlined earlier
        //does this by adding active status to detail panle in css
        panel.classed("active", true);


        //ok now the big thing to do is to isolate points and hihhlight them
        //because we want to only see the sel artists work

        //first i'll dim unsel points
        //sel all bubbles using bubbles.filter
        //ref: https://www.youtube.com/watch?v=2w3vHFzgzhc
        //then animate using .transition() to de-emph using opacity 0.1 & no border
        bubbles.filter(d => d.movement === clickedData.movement).transition().duration(500).style("opacity", 0.1).style("stroke", "none");
        //then i'll highlight sel
        //in movement, only bubbles with clicked artist
        //animate back those bubbles to full  opacity
        //use stroke and stroke width to add black border
        //sel bubbles
        //filter
        //d.artist === clickedData.artist : check if artist on datapoint is same one for clicked dp
        //d.movement === clickedData.movement : check if movement on datapoint is same as movement for clicked dp
        //since an artist might have paintings in diff movements
        //has to pass  both conditions so i used && operator
        bubbles.filter(d => d.artist === clickedData.artist && d.movement === clickedData.movement).transition().duration(500).style("opacity", 1).style("stroke", "#000").style("stroke-width", "3px");
        //the rest is setting animation and its duration

        //now coming to the connection line bw paintings by same artist
        //if theres any previous sel/connection line, i have to remove it 
        //ref: https://stackoverflow.com/questions/24355451/d3-how-delete-shape-on-click-event
        //ref: https://website.education.wisc.edu/~swu28/d3t/concept.html
        //ref: https://livebook.manning.com/book/d3-js-in-action/chapter-9#101; understanding brush/mouse events
        dataLayer.selectAll(".connection-line").remove();
        //initially i wanted to put time on the y-axis like horrified
        //that wouldnt work out though given the irregular shape of the splatter layer/path
        //thus i couldnt sort the points based on time wrt in terms of positioning
        //but it was still something i wanted to explore really bad
        //basically what i thought of was when connecting paintings by the same artist, i can filter by time when connecting those points by line
        //so basically, ine starts from earliest point to latest painint
        //filters so only work by clicked artist
        //sorts asc by year
        //ref: https://www.youtube.com/watch?v=PojpwEbOQJg

        //basically its the same filter sort line from earlier
        //i've just used a comparison to def logic, if a is before b, itll be -
        //NOTE ITS YEAR not any other int so its based on that, earlier i had it reversed
        const artistWorks = data.filter(d => d.artist === clickedData.artist && d.movement === clickedData.movement).sort((a, b) => a.year - b.year);
        //ref: https://www.w3schools.com/jsref/jsref_sort.asp

        //drawing any line needs more than 1 point
        //so first we have to check for that
        if (artistWorks.length > 1) {
            //the below ref helped me bc i hadnt done this before but i also inspected the code in the horrified? exmaple a LOT
            //ref: https://d3js.org/d3-geo/path
            //ref: https://gist.github.com/dimitardanailov/6f0a451d4457b9fa7bf6e0dddcd0f468
            //ref: https://www.youtube.com/watch?v=016EcTiamUc  How to use D3 path to generate lines, areas, shapes and more
            //ref: https://www.youtube.com/watch?v=H3WsXg622WA
            //ref: https://www.youtube.com/watch?v=016EcTiamUc
            const lineGen = d3.line().curve(d3.curveCatmullRom.alpha(0.5)).x(d => d.x).y(d => d.y); //start d3 path gen
            //array to svg path data str
            //stretched so alpha 0.5 -> ref: https://snyk.io/advisor/npm-package/d3-shape/functions/d3-shape.curveCatmullRom
            //ref: https://stackoverflow.com/questions/49526206/how-to-use-catmull-rom-interpolation-in-d3-v3
            //ref: https://www.geeksforgeeks.org/javascript/d3-js-curvecatmullrom-method/
            //ref: https://d3js.org/d3-shape/curve
            //ref: https://using-d3js.com/05_04_curves.html

            //now that we have the path, we need it to be in the right layer
            //append to datalayer
            //NOTE: prev use of .append made the lines come on top of the circles
            //changed to .insert so that the draw order is the line and then th selected data bubbel
            //thus underneath
            const path = dataLayer.insert("path", ".data-bubble").datum(artistWorks).attr("class", "connection-line").attr("d", lineGen)
                .style("fill", "none").style("stroke", "#333").style("stroke-width", 3).style("opacity", 0.8);
            //const path = dataLayer.append("path", ".data-bubble").datum(artistWorks).attr("class", "connection-line").attr("d", lineGen)
            //.style("fill", "none").style("stroke", "#333").style("stroke-width", 3).style("stroke-linecap", "round").style("opacity", 0.8);
            //use datum(artistWorks) to make it single elemtn to path
            //getting len
            const len = path.node().getTotalLength();
            //ref: https://developer.mozilla.org/en-US/docs/Web/API/SVGPathElement/getTotalLength
            //ref: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/stroke-dasharray
            ///IMP ref:https://www.youtube.com/watch?v=-Na_WRk3k74

            //ref: https://d3js.org/d3-ease
            //ref: https://observablehq.com/@d3/easing-animations
            //just def the dash
            path.attr("stroke-dasharray", len + " " + len);


            //issue: this part is super imp, earlier forgot to hide it and the line just kept showing up immed
            path.attr("stroke-dashoffset", len);


            path.transition()
                .duration(4000)
                .ease(d3.easeCubicOut) //so its drawn slowly, can trace career path then
                .attr("stroke-dashoffset", 0);

        }
    }

    function updateLines() {
        //ref: https://www.d3indepth.com/force-layout/
        //basically we need to def a fn to connect lines to shift in bubbles
        const p = dataLayer.select(".connection-line"); //need to look for path with class 
        if (!p.empty()) { //have to check, only code if line exists alr
            const lineGen = d3.line().curve(d3.curveCatmullRom.alpha(0.5)).x(d => d.x).y(d => d.y); //def shape gen and uses d.x and d.y updated by force sim
            //grabs array linked to path
            //array of artworks -> line gen to get new curve
            p.attr("d", lineGen(p.datum())); //based current coords of bubbles
        }
    }

    //now we need to create the data bubbles
    //use data join for circle for everypainitng
    const bubbles = dataLayer.selectAll(".data-bubble").data(data).enter().append("circle") //select placeholder
        //bind csv array to it
        //enter to see which dont have DOM elemenrt, then makes circle for each
        //ref: https://scottmurray.org/work/d3-book
        //ref: https://www.youtube.com/watch?v=IyIAR65G-GQ used to understand .enter().append()
        .attr("class", "data-bubble").attr("r", d => priceScale(d.price)).attr("fill", d => colorScale(d.movement)) //dynamic sizing
        //price into price scale -> px radii
        .attr("opacity", 0).style("display", "none")//setting for trans, issue: if display not set to none the bubbles would still block mouse clicks for blobs underneath them
        .on("mouseover", (e, d) => tooltip.style("opacity", 1).html(`<strong>${d.title}</strong><br>${d.artist}<br>${d.year}<br>$${d.price.toLocaleString()}`)) //injecting the text data, makes tooltip vis
        .on("mousemove", (event) => tooltip.style("left", (event.pageX + 15) + "px").style("top", (event.pageY - 15) + "px")) //need to get mouse px rel to doc
        //issue: at first I didnt put (event.pageY - 15) and (event.pageX + 15), so tooltip underneath cursor and flickering
        //used that to slightly offset
        //ref: https://observablehq.com/@d3/learn-d3-interaction
        .on("mouseout", () => tooltip.style("opacity", 0)) //tooltip has to disappear when not hovering over a point
        //ref: https://dev.to/puratabla/how-do-event-listeners-work-in-d3js-for-user-interactions-c7c
        .on("click", ArtistTrace); //event listener passing to ArtistTrace fn

    //now need to map data
    //names, loc, img array -> movementGlobs; consolidate for each data point
    //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    const movementGlobs = finalMovementsList.map((m, i) => {
        const pos = PAINT_LOCATIONS[i] || { x: 0, y: 0 }; //hardcoded coords or revert to 0,0
        //merged obj
        return { name: m, x: pos.x, y: pos.y, img: BLOB_IMAGES[i], pathIndex: i % 6 };// eg movement, position, blobl img png name (col4.png eg), cycle through each blob
    });

    //put blob png 
    blobLayer.selectAll(".paint-blob-img").data(movementGlobs).enter().append("image")
        //ref: https://stackoverflow.com/questions/14567809/how-to-add-an-image-to-an-svg-container-using-d3-js; thats why we use "xlink:href" instead of src
        .attr("xlink:href", d => d.img).attr("width", BLOB_IMG_SIZE).attr("height", BLOB_IMG_SIZE) //img source and size and centering we did earlier 
        .attr("x", (d, i) => d.x - (BLOB_IMG_SIZE / 2) + BLOB_NUDGES[i].x)// ref to earlier portion or html file
        .attr("y", (d, i) => d.y - (BLOB_IMG_SIZE / 2) + BLOB_NUDGES[i].y);


    //now putting the interaction circles for the tooltip
    interactionLayer.selectAll(".movement-glob").data(movementGlobs).enter().append("circle")
        .attr("r", INTERACTION_RADIUS).attr("cx", d => d.x).attr("cy", d => d.y) //sizing of circle 
        .attr("fill", "transparent").attr("pointer-events", "all") //making sure user cant see it, but its there: "pointer-events", "all
        //IMP issue: "pointer-events", "all", without this the click wont be passed to layer behind if svg trans
        //ref: https://css-tricks.com/almanac/properties/p/pointer-events/
        .on("mouseover", function (event, d) { //event listener
            //use function instead of arrow bc of : d3.select(this)
            //show ttoltip
            tooltip.style("opacity", 1).html(`<strong>${d.name}</strong><br>${counts[d.name] || 'Mixed'} artworks`); //injects mvment name, use mixed instead of undef
            //sel current circle, only tooltip and track coords on mouseover 
            d3.select(this).on("mousemove", (e) => tooltip.style("left", (e.pageX + 15) + "px").style("top", (e.pageY + 15) + "px")); // mouse coord, ad d15 px
            //so mouse doesnt cover etxt
        })
        .on("mouseout", () => tooltip.style("opacity", 0)) // once we leave the circle, hide tooltip
        .on("click", (event, d) => enterSplatterMode(d)); //data array passed to splatter mode fn

    //ref: https://d3js.org/d3-force/simulation
    //ref: https://d3js.org/d3-force
    //ref: https://www.geeksforgeeks.org/data-visualization/how-to-achieve-disc-shape-in-d3-force-simulation/
    //ref: https://blocks.roadtolarissa.com/HarryStevens/6f001c74bff49ae083d2752af4e95dff
    //ref: https://d3js.org/d3-force/collide
    //ref: https://www.youtube.com/watch?v=ejIcWHpcMTk&pp=ygUWY29sbGlzaW9uIGRldGVjdGlvbiBkMw%3D%3D
    //ref: https://www.youtube.com/watch?v=dJNFPv9Mj-Y&pp=ygUQZDMgZm9yY2UgY29sbGlkZQ%3D%3D
    let simulation = d3.forceSimulation(data) //accepts data, add velo to x and y coords so they move
        .force("collide", d3.forceCollide().radius(d => priceScale(d.price) + 1).strength(1)).stop();//collision detect mod, so they dont overlap
    //adds boundary of 1 px between bubbles min so no overlap




    function closePanel() {
        //lets def a fn to make sure detail panel is closed when we need it to be
        //used in above reset aplette fn
        //use .classed method to rem css class from active status
        //ref: https://www.codecademy.com/resources/docs/d3/interactivity/classed
        d3.select("#detail-panel").classed("active", false);
    }

    function resetToPalette() {
        // Issue: stop sim to free up cpu speed bc otherwise lag in points disappearing when going back to palette view
        simulation.stop();

        //use fn def later to close det panel and hide the ui elem
        closePanel();

        d3.select("#resetBtn").style("display", "none");
        d3.select("#vizLegend").style("display", "none");
        d3.select("#info-panel").style("display", "none");

        //issue: lag when hiding bubbles going back to pal view
        //sol: animate the Parent Group, not the individual bubbles.
        //red workload from N elements to 1 element.
        dataLayer.transition().duration(400) // Slightly faster duration feels snappier
            .style("opacity", 0)
            .on("end", function () {
                // THIS RUNS AFTER THE FADE IS DONE:

                // a. Hide all bubbles and lines now that they are invisible
                bubbles.style("display", "none").attr("opacity", 0);
                dataLayer.selectAll(".connection-line").remove();

                // b. Reset the container's opacity back to 1 so it's ready for next time
                d3.select(this).style("opacity", 1);
            });

        //spatter has to go away
        splatterLayer.transition().duration(400)
            .style("opacity", 0)
            .on("end", () => splatterLayer.style("display", "none"));

        //palette comes back 
        paletteLayer.transition().duration(600).style("opacity", 1);
        blobLayer.transition().duration(600).style("opacity", 1);
        interactionLayer.style("display", "block");
        d3.select("#palette-title").style("opacity", 1); // bring back pal after clicking ret to palette button
        currentActiveMovement = null; // active movement selection cleared
    }

    d3.select("#resetBtn").on("click", resetToPalette);
    svg.on("click", function (event) {
        //obv need to close det panel when going back to og view
        closePanel();

        //remove lines
        dataLayer.selectAll(".connection-line")
            .transition().duration(500)
            .style("opacity", 0)
            .remove();

        //reset bubbles
        if (currentActiveMovement) {
            bubbles.filter(d => d.movement === currentActiveMovement)
                .transition().duration(500)
                .style("opacity", 0.9)    //opacity comes back before hidden
                .style("stroke", "none"); //no sel stroke
        }
    });
});
//books ref: https://www.createwithdata.com/d3-start-to-finish-book/
//books ref: https://leanpub.com/html-svg-css-js-for-data-visualisation
