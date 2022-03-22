## Random A-Frame Entity Generator Component ver 1.1.0
####A-Frame componenet by Chris Godber 
##### Released under MIT License
#### Author - GH: @drnoir 

Experimental A-Frame build to explore creating generative randomness.
Features Demo folder with various templates and examples and core component code.

### Core Functionality
- On load generate a randomised 3D sculpture with random primitives, scale, textures, colors and random positioning based on seed values
- assign random textures if texture mode is on (Optional), random colour to each shape (Optional)
- Two main modes - Load random primitives or load random models (Optional) in glb format (in Schema textures / custumGLB - Boolean)
- Seed values that can be modified to mod amount of randomness / spread and scale
- Min / Max values to determine amount of minimum / Maximum shapes to generate
- Random lights generation (Optional)

### How to Use
Include the component code in your html head with the correct path after your ref to the aFrame library
```
<script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
<script src="randGen.js"></script>
```
##### Make sure the component is referenced correctly otherwise it will not work (lowercase and randgen).

If you do not pass it some values the component will render with the defaults.

You can customise min amount of entities to render, max amount of entities to render, specify if you want to load custum
models, wherever you want to load random lights, the randSeed value, random seed scale value, and any random texture values you 
want to pass the component.

The seed value are used throughout the component for the distribution of random positioning and scaling
You can also load any textures and models for random distribution. The idea is that his gives a lot of 
room for customisation and an almost infinite amount of randomness.

Within your <a-scene> markup in your html file
add a new entity with attribute randgen.(shown here with
example values).

### Example Usage
```
<a-entity 
   id="randGen"
    randgen=
    "minShapes:40;
    maxShapes:80;
    custumGlb:false;
    lights:true;
    randSeed:4;
    custumTexturesIDs:binary,brain,futurecity, lines,orbital,truth;
    custumModels:custumGLB;"
    rotation="0 0 0"
    position="0 0 0"
    >
</a-entity>
```
#### Organising Assets for custom Textures
if withTextures is true, you will need to pass the component  some asset ID's 
for the textures to be applied randomly otherwise the textures will not be applied.

In theory, currently you can pass any number of custom textures.

In the asset section of an A-Scene
```
<a-assets>
    <img id="binary" src="textures/binary.jpg">
    <img id="brain" src="textures/brain.jpg">
    <img id="futurecity" src="textures/futurecity.jpg">
    <img id="lines" src="textures/lines.jpg">
    <img id="orbital" src="textures/Orbital-State.jpg">
    <img id="truth" src="textures/truth.jpg">
</a-assets>
```
#### Passing texture IDs to component Schema Example 
```
custumTexturesIDs:binary,brain,futurecity, lines,orbital,truth;
```
#### Organising Assets for custom Models
```
<a-assets>
   <a-asset-item id="custumGLB" src="./model/custum.glb"></a-asset-item>
   <a-asset-item id="custumGLB2" src="./model/eye.glb"></a-asset-item>
</a-assets>
```
#### Passing Model ID's to component Schema Example
```
custumModels:custumGLB, custumGLB;"
```
#### Export to GLB 
If you include the library aframe-gltf-exporter-component you can also export your scene as a GLB file for reuse elsewhere.
For an example of use look at the demos Buildings, Multiple etc, these also include a button for export with id exportBtn.

If you want to add such a button, make sure you create an element with ID exportBtn and include the aframe-gltf-exporter-component 
either via npm or CDN. 

##### Via CDN
```
<script src="https://unpkg.com/aframe-gltf-exporter-component/dist/aframe-gltf-exporter-component.min.js"></script>
```

#### Button for exporter example
```
   <button type="button" id ="exportBtn">Export as .glb Model</button>
```

### Options and Schema Defaults
#### Schema and defaults
- ##### minShapes:10; Type : Number
- ##### maxShapes:20; Type : Number
- ##### custumGlb:false;  Type : Boolean
- ##### withTextures : false; Type : Boolean
- ##### lights:false; Type : Boolean
- ##### makeFlat:false; Type : Boolean
- ##### randomColor: false; Type: Boolean
- ##### exportToGLB: false; Type: Boolean 
- ##### randSeed:8; Type : Number
- ##### randSeedScale:2; Type : Number
- ##### custumTexturesIDs:[]; Type : Array
- ##### custumModels:[]; Type : Array

 
### Notes
- You are free to put in absurdly high values for min, max and seed values, however your computer may well blow up
at high values - over 9000 for example ;)
- Obviously make sure any asset references to conform to your directory structure (We've all missed this tbf)
- Currently, only glb format is accepted for custom models - I may expand it to accept obj in future as well

### Further Development / Feature optionS
- add UI for customisation of randomness / set max / min etc
- share / export randomly generated scenes - screenshots or save the generated model information 
- social media share buttons etc 

### Possible Uses / Useful modfications 
- reuse / reimagine methods for similar projects
- As a helper / template project for generative art starting points in A-Frame / AR etc
- might be useful for games like a space game where you need to generate a bunch of 
random enemies for example
- Generative Art Projects
- Generate randomly distributed models for reuse (assuming exporter functionality working)