function assembly () {
    // open Json file and read into memory
    d3.json("samples.json").then(bbsamples  => {
        console.log(bbsamples) ;

        let sample_values = [];      // values for h-bar chart
        let otu_ids = [];            // labels for h-bar chart
        let otu_labels = [];         // hovertext for h-bar chart
        

        sample_values = bbsamples.samples[0].sample_values.slice(0,10).reverse();
        console.log(sample_values)
        
        otu_ids = bbsamples.samples[0].otu_ids.slice(0,10).reverse();
        console.log(otu_ids)

        otu_ids = otu_ids.map(a => "OTU " + a);
        console.log(otu_ids);

        otu_labels = bbsamples.samples[0].otu_labels.slice(0,10).reverse();
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
             title : "Diplayed are top 10 OTUs for individual 1"
                
           
        };

        Plotly.newPlot("bar", data);

        
        
    })
}

assembly (); 