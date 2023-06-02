const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requirelogin");
const USER = require("../modal/modal");
const POST = mongoose.model("POST");

router.get("/user/:id", (req, res) => {
  USER.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      POST.find({ postedby: req.params.id })
        .populate("postedby", "_id")
        .exec((err, post) => {
          if (err) {
            return res.status(422).json({ error: err });
          } else {
            res.status(200).json({ user, post });
          }
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "user not found" });
    });
});

router.put("/follow", requirelogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.body.followid,
    {
      $push: { followers: req.user._id },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(402).json({ error: err });
      }
      USER.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followid },
        },
        { new: true }
      )
        .then((result) => res.json(result))
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

router.put("/unfollow", requirelogin, (req, res) => {
  console.log(req.body.followid);
  console.log(req.user._id.toString());

  USER.findByIdAndUpdate(
    req.body.followid,
    {
      $pull: { followers: req.user._id.toString() },
    },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(402).json({ error: err });
      }
      USER.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.followid },
        },
        { new: true }
      )
        .then((result) => res.json(result))
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

// to upload profile pic

router.put("/uploadprofilepic", requirelogin, (req, res) => {
  console.log(req.body.pic);

  USER.findByIdAndUpdate(
    req.user._id,
    {
      $set: { photo: req.body.pic },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.get("/friendsuggestion", requirelogin, async (req, res) => {
  try {
    const user = await USER.findOne({ _id: req.user._id }).populate({
        path:"followers",
        populate:{
            path:"followers",
          
        }
    })
 

    console.log(user);
    // The followers field and followers of each follower are now fully populated
  } catch (error) {
    // Handle error
  }

  // console.log("sSSSSSSSSS", user)
  const map = new Map();

  const followerArray = req.user.followers;
  const followingArray = req.user.following;

  followerArray.forEach((user) => {
    console.log(user);
    if (!followingArray.includes(user)) {
      map.set(user, "follows you");
    }
  });

  followingArray?.forEach(async (friend) => {
   
    const myFriendFollowingList = myfreind.following;
    myFriendFollowingList.forEach((user) => {
      if (!followingArray.includes(user)) {
        if (map.has(user)) {
          let value = map.get(user);
          value.push(friend);
          map.delete(user);
          map.set(user, value);
        } else {
        }
        map.set(user, [friendName]);
      }
    });
  });

  res.status(200).json(map);
});

module.exports = router;
