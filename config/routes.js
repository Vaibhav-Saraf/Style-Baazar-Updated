/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

 const PostsController = require("../api/controllers/PostsController");

 module.exports.routes = {
 
   /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/
 
   '/': 'post/home',
 
   '/database': 'PostsController.posts',
 
   'GET /division':'PostsController.division',
   'POST /section': 'PostsController.section',
   'POST /department': 'PostsController.department',
   // 'POST /signage': 'PostsController.signage',
   'GET /getOffer':'PostsController.offerdb',
   'POST /addData': 'PostsController.create',
   // 'DELETE /deleteData': 'PostsController.delete',
   //'POST /image': 'PostsController.imageEdit',
   'GET /admin':'post/admin',
   'POST /adminLogin':'PostsController.adminLogin',
   'POST /addOffer': 'PostsController.createoffer',
   'POST /offertype': 'PostsController.offertype',
   'POST /offerdetails': 'PostsController.offerdetails',
   'POST /getbrand': 'PostsController.getbrand',
   'GET /home': 'post/home',
   'GET /first':'PostsController.first',
   'POST /category':'PostsController.category',
 
   'POST /barcode':'PostsController.barcode',
 
 
   /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
 
 
 };
 