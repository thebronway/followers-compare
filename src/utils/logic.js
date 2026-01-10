export const processLists = (followers = [], following = []) => {
  const followerMap = new Map(followers.map(u => [u.username, u]));
  const followingMap = new Map(following.map(u => [u.username, u]));

  const mutual = [];
  const fans = []; // Follows you, you don't follow back
  const nonFollowers = []; // You follow, they don't follow back

  // Calculate Mutuals and Fans
  followers.forEach(user => {
    if (followingMap.has(user.username)) {
      mutual.push(user);
    } else {
      fans.push(user);
    }
  });

  // Calculate Non-Followers
  following.forEach(user => {
    if (!followerMap.has(user.username)) {
      nonFollowers.push(user);
    }
  });

  return { mutual, fans, nonFollowers };
};