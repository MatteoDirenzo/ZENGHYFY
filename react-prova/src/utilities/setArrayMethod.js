const biggetsImageMethod = (itemImage) => {
  if (itemImage.length !== 0) {
    const biggetsImage = itemImage.reduce((firstImage, secondImage) => {
      if (secondImage.height > firstImage.height) return secondImage;
      return firstImage;
    }, itemImage[0]);
    return biggetsImage.url;
  } else {
    return "https://lh3.googleusercontent.com/proxy/q_-TUBLRfgv30M1NHQZ6KocQ1pj9M84_AjCr7Q3u4ffDbXGtebVx3Zr106fG9QUxQs5xcmbz_OF2x_1P6iuuOYi1iYiTQ12KgTOJz0X6AYvBcHdkbHisbVaCLkBgYLxrqXoJe2felOXsVMXmhpAgDxaT2x1iIqoMojFS-CbuVvuS5KeXJokyAMJC5klepFfyv1uKp12Lrw";
  }
};

const setArrayMethod = (item, itemImage, addedAt, origin) => {
  if (origin === "tracks")
    return {
      artist: item.artists[0].name,
      title: item.name,
      uri: item.uri,
      id: item.id,
      addedAt: addedAt,
      albumUrl: biggetsImageMethod(itemImage),
    };
  if (origin === "tracks" && addedAt === "no")
    return {
      artist: item.artists[0].name,
      title: item.name,
      uri: item.uri,
      id: item.id,
      albumUrl: biggetsImageMethod(itemImage),
    };
  if (origin === "playlists" && addedAt === "no")
    return {
      title: item.name,
      uri: item.uri,
      id: item.id,
      playlistUrl: biggetsImageMethod(itemImage),
    };
};

export default setArrayMethod;
