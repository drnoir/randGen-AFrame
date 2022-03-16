window.onload = function() {
    startScene();
};

function startScene() {
    // const entity = document.getElementById('randGen')
    // //TESTING STUFF
    // const minInput = document.querySelector('#minInput');
    // minInput.addEventListener('input', function (evt) {
    //     // your logic
    //     evt.preventDefault();
    //     let newMin = this.value;
    //     console.log(newMin);
    //
    //     entity.setAttribute('randgen', 'minShapes',newMin)
    // });
    const exportBtn= document.getElementById('exportBtn')
    exportBtn.addEventListener("click",exportToGlb);
    function exportToGlb(){
        AFRAME.scenes[0].systems['gltf-exporter'].export(input, options);
    }


}



