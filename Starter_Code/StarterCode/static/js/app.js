// save url for sample data
var dataSet = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"




function hbarchart (bbPerson) {
    // open Json file and read into memory
    d3.json(dataSet).then(bbsamples  => {
        //console.log("printing bbsamples")
        //console.log(bbsamples) ;

        let sample_values = [];      // values for h-bar chart
        let otu_ids = [];            // labels for h-bar chart
        let otu_labels = [];         // hovertext for h-bar chart
        let hbarchoice = [];             // selection id
        
        hbarchoice = bbsamples.samples.filter(result => result.id == bbPerson)
        console.log("printing choice")
        console.log(hbarchoice);

        sample_values = hbarchoice[0].sample_values.slice(0,10).reverse();
        console.log(sample_values);
        
        otu_ids = hbarchoice[0].otu_ids.slice(0,10).reverse();
        console.log(otu_ids);

        otu_ids = otu_ids.map(a => "OTU " + a);
        console.log(otu_ids);

        otu_labels = hbarchoice[0].otu_labels.slice(0,10).reverse();
        console.log(otu_labels);

        // create h-bar chart
        let trace1 = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,

            marker: {
                color: "blue"
            },
            type: "bar",
            orientation: "h"
        };

        let data = [trace1];

        let layout = {
             title : "Displayed are top 10 OTUs for individual "+bbPerson
        };

        // create horizontal bar chart
        Plotly.newPlot("bar", data);

    })
}

 
function bubblechart (bbPerson) {
    // open Json file and read into memory
    d3.json(dataSet).then(bbsamples  => {
        //console.log(bbsamples) ;

        let bubblechoice = bbsamples.samples.filter(result => result.id == bbPerson)

        console.log (bubblechoice[0].sample_values);
        console.log (bubblechoice[0].otu_ids);
        console.log (bubblechoice[0].otu_labels);
        
        let trace2 = {
            x: bubblechoice[0].otu_ids,
            y: bubblechoice[0].sample_values,

            mode: "markers",
            marker:{
                size: bubblechoice[0].sample_values,
                color: bubblechoice[0].otu_ids
            }
        };

        let data1  = [trace2];

        let layout1 = {
            title : "OTU Counts for Individual 1 - clusters of (uuncultivated or unknown) organisms, grouped by DNA",
            xaxis:{title: "OTU ID"},
            yaxis:{title: "Sample Value"}
                         
        };

        // create bubble graph
        Plotly.newPlot("bubble", data1 , layout1);
    })
}


function mdata (bbPerson) {
    // open Json file and read into memory
    d3.json(dataSet).then(bbsamples  => {
        console.log ("-------------------------"+ bbPerson);
        console.log(bbsamples) ;
        // create empty #sample-metadata 
        d3.select("#sample-metadata").text("");

        let md = [];
        md = bbsamples.metadata;
        console.log ("::::::::::::::::::" + md);

        let searchArray = md.filter(result => result.id == bbPerson);
        
        console.log("**************")
        console.log("name = " + searchArray[0].id);
               
        Object.entries(searchArray[0]).forEach(([key, value]) => {
            d3.select(".panel-body")
                .append("h5")
                .text(`${key}: ${value}`);

            console.log(`Key: ${key}, Value: ${value}`)
        })
    }
)};



// create the drop down selection at startup

selection();

function selection(){
    
    let dropMenu = d3.selectAll("#selDataset");
    // open Json file and read into memory
    d3.json(dataSet).then(bbsamples  => {
        //console.log(bbsamples) ;
        let sample_names = bbsamples.names;
        sample_names.forEach((name)=>{
            dropMenu.append('option').text(name).property('value',name);
        });

        firstChoice = sample_names[0];
        hbarchart(firstChoice);
        bubblechart(firstChoice);
        mdata(firstChoice);
    })

};   

d3.selectAll('#selDataset').on("change", function() {

    let SelectionChoice = d3.select("#selDataset").property("value")
    //console.log ("printing selectionChoice");
    //console.log (SelectionChoice);

    hbarchart(SelectionChoice);
    bubblechart(SelectionChoice);
    mdata(SelectionChoice);

});









       
        
        
   

