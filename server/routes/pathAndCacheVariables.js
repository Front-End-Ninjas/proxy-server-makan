const ports = {
  images: 'http://imagegallery-env.us-west-1.elasticbeanstalk.com',
  similar: 'http://fec-nile-similaritems.us-west-1.elasticbeanstalk.com',
  reviews: 'http://nilecustomerreviews-env.znsae38bc5.us-west-1.elasticbeanstalk.com',
  description: 'http://nileproductdescription-env.zkb3gk9nqy.us-west-1.elasticbeanstalk.com',
};

const serviceBundlePaths = {
  similar: 'http://fec-nile-similaritems.us-west-1.elasticbeanstalk.com/app.bundle.js',
  images: 'http://imagegallery-env.us-west-1.elasticbeanstalk.com/bundle.js',
  reviews: 'http://nilecustomerreviews-env.znsae38bc5.us-west-1.elasticbeanstalk.com/bundle.js',
  description: 'http://nileproductdescription-env.zkb3gk9nqy.us-west-1.elasticbeanstalk.com/dist/bundle.js',
};

const bundleTagCache = {
  similar: null,
  reviews: null,
  description: null,
  images: null,
};

module.exports = {
  ports,
  serviceBundlePaths,
  bundleTagCache,
};
