import { useEffect, useState } from "react";
import { Tabs, Tab, Typography, Box, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "../../state";
import Item from "../../components/item";
const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");
  console.log("items", items);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const data = await fetch("http://localhost:1337/api/items?populate=image", {
      method: "GET",
    });
    const itemsJson = await data.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []);

  const newArrivalItems = items.filter(
    (item) => item.attributes.category === "newArrivals"
  );
  const topBestSellers = items.filter(
    (item) => item.attributes.category === "bestSellers"
  );
  const topRatedItems = items.filter(
    (item) => item.attributes.category === "topRated"
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{ m: "25px", "& .MuiTabs-flexContainer": { flexWrap: "wrap" } }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="New Arrivals" value="newArrivals" />
        <Tab label="Best Sellers" value="bestSellers" />
        <Tab label="Top Rated" value="topRated" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "newArrivals" &&
          newArrivalItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "bestSellers" &&
          topBestSellers.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
