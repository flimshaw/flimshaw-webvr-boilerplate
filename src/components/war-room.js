require('../loaders/ColladaLoader')(THREE);

AFRAME.registerComponent('war-room', {
  schema: {

  },
  init: function() {
    // console.log(`🎯 there's no fighting in the war room!`)
    // this.modelAsset = document.getElementById('war-room-model');
    // if(this.modelAsset.hasLoaded) {
    //   this.setupAssets();
    // } else {
    //   this.modelAsset.addEventListener('loaded', this.setupAssets.bind(this));
    // }

    var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		loader.load( './assets/models/war-room-wip2.dae', ( collada ) => {

      var defaultMat = new THREE.MeshPhongMaterial({ color: 0xff0000 });
      collada.scene.rotation.y = -90 * Math.PI / 180;
      collada.scene.scale.set(.5, .5, .5)
      var ussrMapMat = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./assets/textures/russian-map-sm.jpg") })
      collada.scene.traverse( function ( child ) {
        if ( child instanceof THREE.Object3D ) {
          // console.log(child.name);
          if(child.name == "USSR-Map") {
            child.children[0].material = ussrMapMat;
          } else if(child.name == "US-Map") {
            child.children[0].material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./assets/textures/us-map-texture.jpg") })
          } else if(child.name == "Europe-Map") {
            child.children[0].material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./assets/textures/europe-map-texture.jpg") })
          } else if(child.name == "Polar-Map") {
            child.children[0].material = ussrMapMat;
          } else if(child.name == "Table-Screen") {
            child.children[0].material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./assets/textures/wall-graph.png") })
          } else if(child.name == "Text-Screen") {
            child.children[0].material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./assets/textures/text-texture.png") })
          } else if(child.name == "BinderCover" || child.name.split('_')[0] == "BinderCover") {
            child.children[0].material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./assets/textures/megadeaths-binder-baked.jpg") })
          } else if(child.name == "Floor") {
            //child.children[0].material.normalMap = new THREE.TextureLoader().load("textures/war-room/WaveNormals.png");
            //child.children[0].material.needsUpdate = true;
            var bumpTex = new THREE.TextureLoader().load("./assets/textures/tile-bump.jpg");
            bumpTex.wrapS = bumpTex.wrapT = THREE.RepeatWrapping;
            bumpTex.generateMipmaps = false;
            bumpTex.magFilter = THREE.LinearFilter;
            bumpTex.minFilter = THREE.LinearFilter;
            child.children[0].material = new THREE.MeshPhongMaterial({
              color: 0x000000,
              specular: 0x222222,
              shininess: 25,
              bumpMap: bumpTex,
              bumpScale: .025
            });
          }
        }
      });

      this.el.object3D.add(collada.scene);
    });

  },
  setupAssets: function() {

  }
})
