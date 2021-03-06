// Random A-Frame Entity Generator Component ver 1.1.0 by Chris Godber GH - drnoir
// Desc: Experimental A-Frame build to explore creating generative randomness.

//Functionality:
// On load generate a randomised 3D sculpture with random primitives, scale, textures, colors and random positioning based on seed values
// Assign random textures if texture mode is on (Optional), random colour to each shape
// Two main modes - Load random primitives or load random models (Optional) in glb format (in Schema textures / custumGLB - Boolean)
// Seed values that can be modified to mod amount of randomness / spread and scale on component
// Min / Max values to determine amount of minimum / Maximum shapes to generate
// Random lights generation (Optional)
// in case of optional Export to GLTF is true

function exportGLTF (input, options) {
    AFRAME.scenes[0].systems['gltf-exporter'].export(input, options);
}

AFRAME.registerComponent("randgen", {
    multiple: true,
    schema: {
        minShapes: {type: 'number', default: 10},
        maxShapes: {type: 'number', default: 20},
        custumGlb: {type: 'boolean', default: false},
        exportToGLB : {type: 'boolean', default: false},
        withTextures: {type: 'boolean', default: true},
        lights: {type: 'boolean', default: false},
        randomColor: {type: 'boolean', default: false},
        makeFlat: {type: 'boolean', default: false},
        randSeed: {type: 'number', default: 8},
        randSeedScale: {type: 'number', default: 2},
        custumTexturesIDs: {type: 'array', default: []},
        custumModels: {type: 'array', default: []}
    },

    init: function () {
        const data = this.data; const min = data.minShapes; const max = data.maxShapes;
        const el = this.el;
        // generate value of type number for amount of shapes based on min max vals
        const randFun = this.genRanNum(min, max);
        // generate entities loop based on component schema
        this.makeSculpture(randFun, data);
        // if export is flagged true then add event listener for exportBtn
        const isExport = data.exportToGLB;
        if (isExport) {
            const exportBtn = document.getElementById('exportBtn')
            exportBtn.addEventListener("click", this.exportToGlb);
        }
    },

    update: function (oldData) {
        const data = this.data;
        const el = this.el;

        console.log("UPDATE FUNCTION HIT...");

        // If `oldData` is empty, then this means we're in the initialization process.
        // No need to update.
        if (Object.keys(oldData).length === 0) {
            console.log("exit");
            return;
        }
        // Geometry-related properties changed. Update the geometry.
        if (data.minShapes !== oldData.minShapes) {
            el.setAttribute('minShapes', data.minShapes);
            console.log("MIN CHANGE DETECTED" + data.minShapes);
        }
    },
    // FLUSH
    remove: function () {
        // Do something the component or its entity is detached.
    },
    tick: function (time, timeDelta) {
        // Do something on every scene tick or frame.
    },
    // generate entities
    makeSculpture: function (amount, data) {
        let id;
        // checking for special mode flags - we only need to do this once before loop so moved it here
        // for option checking in genArtwork
        const flat = data.makeFlat;
        const custumGlb = data.custumGlb;
        const colorState =  data.randomColor
        const withTextures = data.withTextures;
        const options = { flat, custumGlb, colorState, withTextures}

        //main loop for generating pieces
        for (id = 0; id < amount; id++) {
            // genearte the entities with settings
            this.genArtwork(id, data, options);
            const lights = data.lights;
            // light generation if lights boolean is true - if ID is divisble by two (To avoid lights being generated EVERY stage of loop)
            if (id === id % 2 && lights) {
                let Light = document.createElement('a-entity');
                let randLightX;let randLightY;let randLightZ;
                let randIntensity;
                let randRotX;let randRotY;let randRotZ;
                // generate random pos and rotation values
                randLightX = this.genRanNum(0, 4); randLightY = this.genRanNum(0, 1); randLightZ = this.genRanNum(0, 11);
                randRotX = this.genRanNum(0, 45); randRotY = this.genRanNum(0, 45); randRotZ = this.genRanNum(0, 45);
                // randomise intensity of lights
                randIntensity = this.genRanNum(0.1, 0.6);
                let randLightCol = this.randColor().toString;
                // append lights to container
                Light.setAttribute('light', 'type: spot; intensity:' + randIntensity + 'decay: 0.12; penumbra: 0.24; castShadow: true');
                Light.setAttribute('color', '#' + randLightCol);
                Light.setAttribute('position', {x: randLightX, y: randLightY, z: randLightZ});
                Light.setAttribute('rotation', {x: randRotX, y: randRotY, z: randRotZ});
                this.el.appendChild(Light);
            }
        }
    },

    genArtwork: function (id, data, options) {
        //init rand pos vars
        let randX; let randY;let randZ;
        let randScaleX=0;let randScaleY=0;let randScaleZ=0;
        // init randomSeed val for pos
        let randSeed = data.randSeed;
        let randSeedRandom = this.genRanNum(0, randSeed);
        // init randomSeed val for Scale
        let randSeedScale = data.randSeedScale;
        let randSeedScaleRandomMin = this.genRanNum(0.5, randSeedScale);
        let randSeedScaleRandomMax = this.genRanNum(0.5, randSeedScale);

        //generate random positions and scale with genRandNum function
        randX = this.genRanNum(0 , randSeedRandom);
        // conditional checking for if flat flag is on - we want a standard y pos
        if (!options.flat) {
            randY = this.genRanNum(0, randSeedRandom);
        }
        randZ = this.genRanNum(0, randSeedRandom);
        randScaleX = this.genRanNum(1, randSeedScaleRandomMax);randScaleY = this.genRanNum(1, randSeedScaleRandomMax);randScaleZ = this.genRanNum(1, randSeedScaleRandomMax);

        let genPiece; let randPart; let randGLB;
        // determine if custom Obj state is true or false and generate pieces or custum GLB
        if (options.custumGlb) {
            genPiece = document.createElement('a-entity');
            randGLB = this.randomiseGLB(data);
            genPiece.setAttribute('gltf-model', '#' + randGLB);
        } else {
            randPart = this.randomisePiece();
            genPiece = document.createElement(randPart);
        }

        // generate the pieces and  assign randomness :~) *WOOP WOOP* - this is where it all comes together
        // assign random Color checking
        if (options.colorState) {
            let randCol = this.randColor();
            genPiece.setAttribute('material', 'color', '#' + randCol);
        }

        // check if textures mode is init before applying random textures function
        if (options.withTextures) {
            let randomTexture = this.randomiseTexture(data);
            genPiece.setAttribute('material', 'src', '#' + randomTexture);
        }
        // assign random positions
        genPiece.setAttribute('position', {x: randX, y: randY, z: randZ});
        genPiece.setAttribute('scale', {x: randScaleX, y: randScaleY, z: randScaleZ});
        genPiece.setAttribute('name', 'genPiece');
        genPiece.setAttribute('class', 'genPiece' + id);
        genPiece.setAttribute('roughness', this.genRanNum(0, 1));
        genPiece.setAttribute('metalness', this.genRanNum(0, 0.2));
        this.el.appendChild(genPiece);
    },

    randomisePiece: function(){
        //possible options of primitives in Arr
        const posPieces = ['a-box', 'a-sphere', 'a-cylinder', 'a-dodecahedron', 'a-ring', 'a-circle', 'a-triangle', 'a-torus', 'a-tetrahedron'];
        //gen random index pos -1 is due to indexing of array starting from 0
        let randIndx = this.genRanNum(0, posPieces.length);
        let randPiece = posPieces[randIndx];
        // return string from random pos generated
        return randPiece;
    },
    // function to return a random texture
    randomiseTexture: function (data) {
        const TextureIDs = data.custumTexturesIDs;
        //possible options of textures in Arr
        //gen random index pos
        let randIndx = this.genRanNum(0, TextureIDs.length);
        let randTexture = TextureIDs[randIndx];
        // return string from random pos generated
        return randTexture;
    },

// function to return a random texture
    randomiseGLB: function (data) {
        const GLBIDs = data.custumModels;
        //possible options of textures in Arr
        //gen random index pos
        let randIndx = this.genRanNum(0, GLBIDs.length);
        let randGLB = GLBIDs[randIndx];
        // return string from random pos generated
        return randGLB;
    },

    randColor: function() {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return randomColor;
    },

    //return random values between a min / max - resuable
    genRanNum: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    //exoirt to GLB Function - Optional for if Export GLB func is flagged true - default : false
    exportToGlb : function(){
    exportGLTF();
    },

});
