module.exports = {
    posts: async function (req, res) {
      try {
        const posts = await Post.find();
        res.send(posts);
      } catch (err) {
        res.serverError(err.toString());
      }
      return res.view('pages/admin');
    },
  
    offerdb: async function (req, res) {
      try {
        const posts = await Offer.find();
        res.send(posts);
      } catch (err) {
        res.serverError(err.toString());
      }
      return res.view('pages/admin');
    },
    create: function (req, res) {
      const division = req.body.division;
      const section = req.body.section;
      const category = req.body.category;
      const department = req.body.department;
      const brand = req.body.brand;
      const barcode = req.body.barcode;
  
  
      Post.create({ division: division, section: section,category:category, department: department, brand: brand, barcode: barcode }).exec((err) => {
        if (err) {
          return res.serverError(err.toString());
        }
  
        console.log('Finished creating post object');
  
        return res.view('pages/admin');
  
        });
    },
  
    createoffer: function (req, res) {
      const ot = req.body.ot;
      const od = req.body.od;
  
      Offer.create({ ot: ot, od: od }).exec((err) => {
        if (err) {
          return res.serverError(err.toString());
        }
  
        console.log('Finished creating post object');
  
        return res.view('pages/admin');
      });
    },
  
    delete: async function (req, res) {
      const postId = req.body.postId;
      await Post.destroy({ id: postId });
      res.send('Finished deleting post');
    },
  
    division: async function(req,res){
      let sec = new Set();
      await Post.find().exec(function (err, data) {
        if (err) {
          console.log(err)
        } else {
          for (var i = 0; i < data.length; i++) {
            sec.add(data[i].division);
          }
          return res.send(Array.from(sec))
        }
      });
    },
  
    section: async function (req, res) {
      const division = req.body.division;
      let sec = new Set();
      await Post.find({ where: { division: division } }).exec(function (err, data) {
        if (err) {
          console.log(err)
        } else {
          for (var i = 0; i < data.length; i++) {
            sec.add(data[i].section);
          }
          return res.send(Array.from(sec))
        }
      });
    },
  
    category:async function (req, res) {
      const section = req.body.section;
      let dep = new Set();
      await Post.find({ where: {section: section } }).exec(function (err, data) {
        if (err) {
          console.log(err)
        } else {
          for (var i = 0; i < data.length; i++) {
            dep.add(data[i].category);
          }
          return res.send(Array.from(dep))
        }
      });
    },
  
    department: async function (req, res) {
      const category = req.body.category;
      const section = req.body.section;
      const division = req.body.division;
      let dep = new Set();
      await Post.find({ where: {division: division, section:section, category:category } }).exec(function (err, data) {
        if (err) {
          console.log(err)
        } else {
          for (var i = 0; i < data.length; i++) {
            dep.add(data[i].department);
          }
          return res.send(Array.from(dep))
        }
      });
    },
  
    offertype: async function (req, res) {
      let department = req.body.department;
      let dep = new Set();
      await Offer.find().exec(function (err, data) {
        if (err) {
          console.log(err)
        } else {
          for (var i = 0; i < data.length; i++) {
            dep.add(data[i].ot);
          }
          return res.send(Array.from(dep))
        }
      });
    },
  
    offerdetails: async function (req, res) {
      const offertype = req.body.offertype;
      let dep = new Set();
      await Offer.find({ where: { ot: offertype } }).exec(function (err, data) {
        if (err) {
          console.log(err)
        } else {
          for (var i = 0; i < data.length; i++) {
            dep.add(data[i].od);
          }
          return res.send(Array.from(dep))
        }
      });
    },
  
    getbrand: async function (req, res) {
      const department = req.body.department;
      const section = req.body.section;
      const division = req.body.division;
      let dep = new Set();
      await Post.find({ where: { division:division, department: department, section:section } }).exec(function (err, data) {
        if (err) {
          console.log(err)
        } else {
          for (var i = 0; i < data.length; i++) {
            dep.add(data[i].brand);
          }
          dep.add( );
          return res.send(Array.from(dep))
        }
      });
    },
  
    first:async function(req,res){
      res.view('pages/first')
    },
  
    adminLogin: async function(req,res){
      const username = req.body.username;
      const password = req.body.password;
      if(username==="stylebaazar"&&password==="style3@baazar"||username==="arindamSB"&&password==="style2@baazar"||username==="samirSB"&&password==="style1@baazar"){
        res.view('pages/admin')
      }else{
        res.view('pages/adminLogin')
      }
    },
  
    barcode:async function(req,res){
      const department = req.body.department;
      const division = req.body.division;
      const section = req.body.section;
      const brand = req.body.brand;
      let dep = new Set();
      await Post.find({ where: { department: department, division:division,section:section,brand:brand } }).exec(function (err, data) {
        if (err) {
          console.log(err)
        } else {
          for (var i = 0; i < data.length; i++) {
            dep.add(data[i].barcode);
          }
          dep.add( );
          return res.send(Array.from(dep))
        }
      });
    },
  
  
    // signage: async function(req,res){
    //   const section = req.body.section;
    //   const department = req.body.department;
    //   let sin = new Set();
    //   await Post.find({ where: { department : department,section: section }}).exec(function(err, data) {
    //     if(err){
    //       console.log(err)
    //     }else{
    //       for(var i =0; i<data.length;i++){
    //         sin.add(data[i].signage);
    //       }
    //       return res.send(Array.from(sin))
    //     }
    // });
    // },
  
    // home: async function(req,res){
    // },
  
  
  
    // imageEdit: async function (req, res) {
    //   const division = req.body.division;
    //   const department = req.body.department;
    //   const brand = req.body.brand;
    //   const mrp = req.body.mrp;
    //   const range1 = req.body.range1;
    //   const range2 = req.body.range2;
    //   const ot = req.body.ot;
    //   const od = req.body.od;
    //   const nmrp = req.body.nmrp;
  
  
    //   var imgbbUploader = require('imgbb-uploader');
  
  
    //   async function textOverlay() {
    //     // Reading image
    //     var image;
  
  
    //     if (division === "APPARELS") {
    //       if (range1 === "") {
    //         if (ot === "FLAT PRICE") {
    //           try {
    //             const Jimp = require('jimp');
  
    //             image = await Jimp.read('assets/images/white1.jpg');
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = od;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 150,
    //                 {
    //                   text: text,
    //                 }, textWidth * 1.5, textHight * 1.5)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW90/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = department;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-SemiBoldNEW48.ttf/Montserrat-SemiBold.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text1 = "MRP:"
    //               let text = text1.concat(mrp);
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 200,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
    //             // image.writeAsync('assets/images/a4test.jpeg');
  
    //             imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //               .then(response => {
    //                 res.send(response)
    //               })
    //               .catch(error => console.log(error));
    //           } catch (error) {
    //             console.log(error)
    //           }
    //         }
    //         else if (ot === "MRP ONLY") {
    //           try {
    //             const Jimp = require('jimp');
  
    //             image = await Jimp.read('assets/images/white1.jpg');
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = "MRP: " + mrp;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 150,
    //                 {
    //                   text: text,
    //                 }, textWidth * 1.5, textHight * 1.5)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW90/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = department;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
    //             // image.writeAsync('assets/images/a4test.jpeg');
  
    //             imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //               .then(response => {
    //                 res.send(response)
    //               })
    //               .catch(error => console.log(error));
    //           } catch (error) {
    //             console.log(error)
    //           }
    //         }
    //         else if (ot === "LIQUIDATION PRICE") {
    //           console.log("entered")
    //           try {
    //             const Jimp = require('jimp');
  
    //             image = await Jimp.read('assets/images/white1.jpg');
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW90/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = "PICK ANY";
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 150,
    //                 {
    //                   text: text,
    //                 }, textWidth * 1.5, textHight * 1.5)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = od;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //               .then(response => {
    //                 res.send(response)
    //               })
    //               .catch(error => console.log(error));
    //           } catch (error) {
    //             console.log(error)
    //           }
    //         }
  
  
    //         else if (ot === "POWER PRICING-FLAT PRICE" || ot === "POWER PRICING-% OFF(2PCS)" || ot === "POWER PRICING-% OFF(3PCS)") {
    //           try {
    //             const Jimp = require('jimp');
  
    //             image = await Jimp.read('assets/images/white1.jpg');
  
    //             let a = od.split(";");
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = a[0];
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 200,
    //                 {
    //                   text: text,
    //                 }, textWidth * 1.5, textHight * 1.5)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = a[1];
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 50,
    //                 {
    //                   text: text,
    //                 }, textWidth * 1.5, textHight * 1.5)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW90/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = department;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 100,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-SemiBoldNEW48.ttf/Montserrat-SemiBold.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text1 = "MRP:"
    //               let text = text1.concat(mrp);
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 200,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
    //             // image.writeAsync('assets/images/a4test.jpeg');
  
    //             imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //               .then(response => {
    //                 res.send(response)
    //               })
    //               .catch(error => console.log(error));
    //           } catch (error) {
    //             console.log(error)
    //           }
    //         }
    //         else if (ot === '% OFF-SINGLE CASE' || ot === "CORE POWER PRICING" || ot === "DEAL(B1G1)") {
    //           // try {
    //           //   const Jimp = require('jimp');
  
    //           //   image = await Jimp.read('assets/images/white1.jpg');
  
    //           //   Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //           //     var w = image.bitmap.width;
    //           //     var h = image.bitmap.height;
    //           //     let text = od;
    //           //     var textWidth = Jimp.measureText(font, text);
    //           //     var textHight = Jimp.measureTextHeight(font, text);
    //           //     image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 150,
    //           //       {
    //           //         text: text,
    //           //       }, textWidth * 1.5, textHight * 1.5)
    //           //       .write('assets/images/a4test.jpeg'); // save
    //           //   });
  
    //           //   Jimp.loadFont('assets/fonts/Montserrat-Black-NEW90/Montserrat-Black.ttf.fnt', (err, font) => {
    //           //     var w = image.bitmap.width;
    //           //     var h = image.bitmap.height;
    //           //     let text = department;
    //           //     var textWidth = Jimp.measureText(font, text);
    //           //     var textHight = Jimp.measureTextHeight(font, text);
    //           //     image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //           //       {
    //           //         text: text,
    //           //       }, textWidth, textHight)
    //           //       .write('assets/images/a4test.jpeg'); // save
    //           //   });
  
    //           //   Jimp.loadFont('assets/fonts/Montserrat-SemiBoldNEW48.ttf/Montserrat-SemiBold.ttf.fnt', (err, font) => {
    //           //     var w = image.bitmap.width;
    //           //     var h = image.bitmap.height;
    //           //     let text = "MRP: " + mrp;
    //           //     var textWidth = Jimp.measureText(font, text);
    //           //     var textHight = Jimp.measureTextHeight(font, text);
    //           //     image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 200,
    //           //       {
    //           //         text: text,
    //           //       }, textWidth, textHight)
    //           //       .write('assets/images/a4test.jpeg'); // save
    //           //   });
    //           //   // image.writeAsync('assets/images/a4test.jpeg');
  
    //           //   imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //           //     .then(response => {
    //           //       res.send(response)
    //           //     })
    //           //     .catch(error => console.log(error));
    //           // } catch (error) {
    //           //   console.log(error)
    //           // }
  
  
  
  
    //         }
    //         else if (ot === "PRICE OFF") {
    //           try {
    //             const Jimp = require('jimp');
  
    //             image = await Jimp.read('assets/images/white1.jpg');
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-115/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = od;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 150,
    //                 {
    //                   text: text,
    //                 }, textWidth * 1.5, textHight * 1.5)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW90/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = department;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-SemiBoldNEW48.ttf/Montserrat-SemiBold.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = "MRP: " + mrp;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 200,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
    //             // image.writeAsync('assets/images/a4test.jpeg');
  
    //             imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //               .then(response => {
    //                 res.send(response)
    //               })
    //               .catch(error => console.log(error));
    //           } catch (error) {
    //             console.log(error)
    //           }
    //         }
    //       }
    //       else {
    //         if (ot === "FLAT PRICE") {
    //           try {
    //             const Jimp = require('jimp');
  
    //             image = await Jimp.read('assets/images/white1.jpg');
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = od;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 150,
    //                 {
    //                   text: text,
    //                 }, textWidth * 1.5, textHight * 1.5)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW90/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = department;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-SemiBoldNEW48.ttf/Montserrat-SemiBold.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = "MRP: " + range1 + "-" + range2;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 200,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
    //             // image.writeAsync('assets/images/a4test.jpeg');
  
    //             imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //               .then(response => {
    //                 res.send(response)
    //               })
    //               .catch(error => console.log(error));
    //           } catch (error) {
    //             console.log(error)
    //           }
    //         }
    //         else if (ot === "RANGE ONLY") {
    //           try {
    //             const Jimp = require('jimp');
  
    //             image = await Jimp.read('assets/images/white1.jpg');
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = "MRP: " + range1 + "-" + range2;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 150,
    //                 {
    //                   text: text,
    //                 }, textWidth * 1.5, textHight * 1.5)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW90/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = department;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
    //             // image.writeAsync('assets/images/a4test.jpeg');
  
    //             imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //               .then(response => {
    //                 res.send(response)
    //               })
    //               .catch(error => console.log(error));
    //           } catch (error) {
    //             console.log(error)
    //           }
    //         }
    //         else if (ot === "LIQUIDATION PRICE") {
    //           console.log("entered")
    //           try {
    //             const Jimp = require('jimp');
  
    //             image = await Jimp.read('assets/images/white1.jpg');
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW90/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = "PICK ANY";
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 150,
    //                 {
    //                   text: text,
    //                 }, textWidth * 1.5, textHight * 1.5)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = od;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //               .then(response => {
    //                 res.send(response)
    //               })
    //               .catch(error => console.log(error));
    //           } catch (error) {
    //             console.log(error)
    //           }
    //         }
  
  
    //         else if (ot === "POWER PRICING-FLAT PRICE" || ot === "POWER PRICING-% OFF(2PCS)" || ot === "POWER PRICING-% OFF(3PCS)") {
    //           try {
    //             const Jimp = require('jimp');
  
    //             image = await Jimp.read('assets/images/white1.jpg');
  
    //             let a = od.split(";");
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = a[0];
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 200,
    //                 {
    //                   text: text,
    //                 }, textWidth * 1.5, textHight * 1.5)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = a[1];
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 50,
    //                 {
    //                   text: text,
    //                 }, textWidth * 1.5, textHight * 1.5)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW90/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = department;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 100,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-SemiBoldNEW48.ttf/Montserrat-SemiBold.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = "MRP: " + range1 + "-" + range2;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 200,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
    //             // image.writeAsync('assets/images/a4test.jpeg');
  
    //             imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //               .then(response => {
    //                 res.send(response)
    //               })
    //               .catch(error => console.log(error));
    //           } catch (error) {
    //             console.log(error)
    //           }
    //         }
    //         else if (ot === '% OFF-SINGLE CASE' || ot === "CORE POWER PRICING" || ot === "DEAL(B1G1)") {
    //           try {
    //             const Jimp = require('jimp');
  
    //             image = await Jimp.read('assets/images/white1.jpg');
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = od;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 150,
    //                 {
    //                   text: text,
    //                 }, textWidth * 1.5, textHight * 1.5)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW90/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = department;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-SemiBoldNEW48.ttf/Montserrat-SemiBold.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = "MRP: " + range1 + "-" + range2;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 200,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
    //             // image.writeAsync('assets/images/a4test.jpeg');
  
    //             imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //               .then(response => {
    //                 res.send(response)
    //               })
    //               .catch(error => console.log(error));
    //           } catch (error) {
    //             console.log(error)
    //           }
  
    //         }
    //         else if (ot === "PRICE OFF") {
    //           try {
    //             const Jimp = require('jimp');
  
    //             image = await Jimp.read('assets/images/white1.jpg');
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-115/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = od;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 150,
    //                 {
    //                   text: text,
    //                 }, textWidth * 1.5, textHight * 1.5)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-Black-NEW90/Montserrat-Black.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = department;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
  
    //             Jimp.loadFont('assets/fonts/Montserrat-SemiBoldNEW48.ttf/Montserrat-SemiBold.ttf.fnt', (err, font) => {
    //               var w = image.bitmap.width;
    //               var h = image.bitmap.height;
    //               let text = "MRP: " + range1 + "-" + range2;
    //               var textWidth = Jimp.measureText(font, text);
    //               var textHight = Jimp.measureTextHeight(font, text);
    //               image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 200,
    //                 {
    //                   text: text,
    //                 }, textWidth, textHight)
    //                 .write('assets/images/a4test.jpeg'); // save
    //             });
    //             // image.writeAsync('assets/images/a4test.jpeg');
  
    //             imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //               .then(response => {
    //                 res.send(response)
    //               })
    //               .catch(error => console.log(error));
    //           } catch (error) {
    //             console.log(error)
    //           }
    //         }
    //       }
    //     } // NON APPARELS
    //     else {
    //       if (ot === "FLAT PRICE") {
    //         try {
    //           const Jimp = require('jimp');
  
    //           image = await Jimp.read('assets/images/white1.jpg');
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-60NEW/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = department;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 200,
    //               {
    //                 text: text,
    //               }, textWidth * 1.5, textHight * 1.5)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-60NEW/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = brand;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 -100,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = od;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-60NEW/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = "MRP: "+mrp;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 150,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
    //           // image.writeAsync('assets/images/a4test.jpeg');
  
    //           imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //             .then(response => {
    //               res.send(response)
    //             })
    //             .catch(error => console.log(error));
    //         } catch (error) {
    //           console.log(error)
    //         }
    //       }
    //       else if (ot === "MRP ONLY") {
    //         try {
    //           const Jimp = require('jimp');
  
    //           image = await Jimp.read('assets/images/white1.jpg');
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-60NEW/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = department;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 200,
    //               {
    //                 text: text,
    //               }, textWidth * 1.5, textHight * 1.5)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-60NEW/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = brand;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 -100,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = "MRP: "+mrp;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           // image.writeAsync('assets/images/a4test.jpeg');
  
    //           imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //             .then(response => {
    //               res.send(response)
    //             })
    //             .catch(error => console.log(error));
    //         } catch (error) {
    //           console.log(error)
    //         }
    //       }
    //       else if (ot === "LIQUIDATION PRICE") {
    //         console.log("entered")
    //         try {
    //           const Jimp = require('jimp');
  
    //           image = await Jimp.read('assets/images/white1.jpg');
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-NEW90/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = "PICK ANY";
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 150,
    //               {
    //                 text: text,
    //               }, textWidth * 1.5, textHight * 1.5)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = od;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //             .then(response => {
    //               res.send(response)
    //             })
    //             .catch(error => console.log(error));
    //         } catch (error) {
    //           console.log(error)
    //         }
    //       }
  
  
    //       else if (ot === "POWER PRICING-FLAT PRICE" || ot === "POWER PRICING-% OFF(2PCS)" || ot === "POWER PRICING-% OFF(3PCS)") {
    //         try {
    //           const Jimp = require('jimp');
  
    //           image = await Jimp.read('assets/images/white1.jpg');
  
    //           let a = od.split(";");
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = a[0];
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 200,
    //               {
    //                 text: text,
    //               }, textWidth * 1.5, textHight * 1.5)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = a[1];
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 50,
    //               {
    //                 text: text,
    //               }, textWidth * 1.5, textHight * 1.5)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-NEW90/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = department;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 100,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-SemiBoldNEW48.ttf/Montserrat-SemiBold.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text1 = "MRP:"
    //             let text = text1.concat(mrp);
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 200,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
    //           // image.writeAsync('assets/images/a4test.jpeg');
  
    //           imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //             .then(response => {
    //               res.send(response)
    //             })
    //             .catch(error => console.log(error));
    //         } catch (error) {
    //           console.log(error)
    //         }
    //       }
    //       else if (ot === '% OFF-SINGLE CASE' || ot === "CORE POWER PRICING" || ot === "DEAL(B1G1)") {
    //         try {
    //           const Jimp = require('jimp');
  
    //           image = await Jimp.read('assets/images/white1.jpg');
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-60NEW/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = department;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 200,
    //               {
    //                 text: text,
    //               }, textWidth * 1.5, textHight * 1.5)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-60NEW/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = brand;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 -100,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = od;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-60NEW/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = "MRP: "+mrp;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 150,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
    //           // image.writeAsync('assets/images/a4test.jpeg');
  
    //           imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //             .then(response => {
    //               res.send(response)
    //             })
    //             .catch(error => console.log(error));
    //         } catch (error) {
    //           console.log(error)
    //         }
  
    //       }
    //       else if(ot==="NEW MRP"){
    //         try {
    //           const Jimp = require('jimp');
  
    //           image = await Jimp.read('assets/images/white1.jpg');
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-60NEW/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = department;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 200,
    //               {
    //                 text: text,
    //               }, textWidth * 1.5, textHight * 1.5)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-60NEW/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = brand;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 -100,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = nmrp;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-60NEW/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = "MRP: ₹"+mrp;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 150,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
    //           // image.writeAsync('assets/images/a4test.jpeg');
  
    //           imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //             .then(response => {
    //               res.send(response)
    //             })
    //             .catch(error => console.log(error));
    //         } catch (error) {
    //           console.log(error)
    //         }
    //       }
    //       else if (ot === "PRICE OFF") {
    //         try {
    //           const Jimp = require('jimp');
  
    //           image = await Jimp.read('assets/images/white1.jpg');
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-60NEW/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = department;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 - 200,
    //               {
    //                 text: text,
    //               }, textWidth * 1.5, textHight * 1.5)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-60NEW/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = brand;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 -100,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-NEW128/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = od;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 50,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
  
    //           Jimp.loadFont('assets/fonts/Montserrat-Black-60NEW/Montserrat-Black.ttf.fnt', (err, font) => {
    //             var w = image.bitmap.width;
    //             var h = image.bitmap.height;
    //             let text = "MRP: "+mrp;
    //             var textWidth = Jimp.measureText(font, text);
    //             var textHight = Jimp.measureTextHeight(font, text);
    //             image.print(font, w / 2 - textWidth / 2, h / 2 - textHight / 2 + 150,
    //               {
    //                 text: text,
    //               }, textWidth, textHight)
    //               .write('assets/images/a4test.jpeg'); // save
    //           });
    //           // image.writeAsync('assets/images/a4test.jpeg');
  
    //           imgbbUploader('ad6cf3c841f4ebe03e394eb3847989ba', 'assets/images/a4test.jpeg')
    //             .then(response => {
    //               res.send(response)
    //             })
    //             .catch(error => console.log(error));
    //         } catch (error) {
    //           console.log(error)
    //         }
    //       }
  
  
  
    //     }
    //   }
  
  
  
    //   textOverlay();
    //   console.log('Image is processed succesfully');
    //   //const url = imgbbUploader.response.url;
    //   //res.send(url);
    // },
  
  };
  