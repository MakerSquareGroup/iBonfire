const Helpers = module.exports;

// The below functions are used in the controllers 

Helpers.seperateParams = (getParams) => {
  var reg = /[&]/;
  var coords = getParams.split(reg);

  return coords;
};

Helpers.checkParamsBonfire = (getParams) => {
  var reg = /[&]/g;
  if (getParams.match(reg)) {
    console.log('This GET request is for a bonfire at a coordinate');
    return seperateParams(getParams);
  } else {
    console.log('This GET request finds a bonfire based on the bonfire id');
    return getParams;
  }
};

Helpers.checkParamsUser = (getParams) => {
  var reg = /[&]/;
  if (getParams.match(reg)) {
    console.log('This GET request is for a user at a coordinate');
    return seperateParams(getParams);
  } else {
    console.log('This GET request finds a user based on FB_id');
    return getParams;
  }
};

// This function is made to be scalable. Currently it will seperate out only the user ID
// and returns all bonfires associatewd with that user, however, it can be expanded to 
// accept other arguments to filter results i.e.: by location.

Helpers.checkParamsUserBonfires = (userBonfires) => {
  var reg = /[=]/;
  if (userBonfires.match(reg)) {
    console.log('This GET request is for returning all bonfires by user id');
    return (seperateUserBonfire(userBonfires));
  } else {
    return userBonfires;
  }
};

Helpers.seperateUserBonfire = (userId) => {
  var reg = /[=]/;
  var passedInProps = userId.split(reg);

  return {
    "createdBy": passedInProps[0],
    "Filter": passedInProps[1]
  };
};