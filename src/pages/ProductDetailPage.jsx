import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { asyncGetProductDetail } from "../states/products/action";
import {
  Box,
  Card,
  Rating,
  Tab,
  Table,
  TableCell,
  TableRow,
  Tabs,
} from "@mui/material";
import Slider from "react-slick";
import TabPanel from "../components/TabPanel";
import ImageButton from "../components/ImageButton";
import Review from "../components/Review";
import { calculateAverage } from "../utils";
import Loading from "../components/Loading";

function ProductDetailPage() {
  const { id } = useParams();
  const { loading } = useSelector((states) => states);
  const { productDetail = {} } = useSelector((states) => states.products);
  const [activeSlide, setActiveSlide] = useState(0);
  const [tab, setTab] = useState(0);
  const sliderRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetProductDetail(id));
  }, [dispatch, id]);

  const sliderOptions = {
    dots: false,
    infinite: false,
    speed: 1000,
    slideToShow: 1,
    slideToScroll: 1,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  const averageRating =
    Object.keys(productDetail).length !== 0 && productDetail.reviews?.length > 0
      ? calculateAverage(productDetail.reviews.map((review) => review.rating))
      : 0;

  return (
    <section className="flex w-full flex-col gap-4 overflow-auto p-4">
      {loading && Object.keys(productDetail).length === 0 && (
        <div className="flex h-screen w-full items-center justify-center">
          <Loading />
        </div>
      )}
      {!loading && Object.keys(productDetail).length === 0 && (
        <div className="flex h-screen w-full items-center justify-center">
          <p className="text-xl font-semibold">
            Product with ID:{id} not found!
          </p>
        </div>
      )}
      {!loading && Object.keys(productDetail).length !== 0 && (
        <Card className="w-full p-4 md:p-8">
          <div className="flex flex-col items-start gap-10 md:flex-row">
            <div className="flex w-full items-start gap-10 md:w-3/5">
              <div className="hidden md:block md:w-1/5">
                {Object.hasOwn(productDetail, "images") ? (
                  productDetail.images.map((image, index) => (
                    <ImageButton
                      index={index}
                      image={image}
                      sliderRef={sliderRef}
                      activeSlide={activeSlide}
                    />
                  ))
                ) : (
                  <img
                    src="https://dummyjson.com/image/400x400/282828/ffffff?text=Image+Not+Found"
                    alt="dummy-image"
                  />
                )}
              </div>
              <div className="w-full md:w-4/5">
                <Slider
                  ref={sliderRef}
                  arrows={false}
                  className=""
                  {...sliderOptions}
                >
                  {productDetail && Object.hasOwn(productDetail, "images") ? (
                    productDetail.images.map((image, index) => (
                      <div className="">
                        <img
                          key={index}
                          src={image}
                          alt={`image-${index}`}
                          className="w-full rounded-xl border border-slate-200 bg-slate-100 p-4"
                        />
                      </div>
                    ))
                  ) : (
                    <img
                      src="https://dummyjson.com/image/400x400/282828/ffffff?text=Image+Not+Found"
                      alt="dummy-image"
                    />
                  )}
                </Slider>
              </div>
            </div>
            <div className="w-full md:w-2/5">
              <div className="max-w-[200px] rounded-full bg-orange-600 px-4 py-2 font-semibold text-white">
                <p className="text-center capitalize">
                  {productDetail.category}
                </p>
              </div>
              <div className="mt-10">
                <h1 className="text-lg font-semibold md:text-2xl">
                  {productDetail.title}
                </h1>
                <div className="mt-2 flex items-center gap-2">
                  <Rating value={averageRating} />
                  <p className="text-lg text-orange-600">{averageRating}</p>
                </div>
                <Table className="mt-10">
                  <TableRow>
                    <TableCell className="text-slate-500">Stock:</TableCell>
                    <TableCell>{productDetail.stock}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-slate-500">Shipping:</TableCell>
                    <TableCell>{productDetail.shippingInformation}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-slate-500">Warranty:</TableCell>
                    <TableCell>{productDetail.warrantyInformation}</TableCell>
                  </TableRow>
                </Table>
              </div>
              <div className="mt-10">
                <p className="text-xl font-medium text-slate-400">Price</p>
                <p className="text-2xl font-bold md:text-3xl">
                  $ {productDetail.price}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
                <Tab label="description" sx={{ textTransform: "capitalize" }} />
                <Tab label="reviews" sx={{ textTransform: "capitalize" }} />
              </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
              {productDetail.description}
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <div className="flex flex-col items-start gap-4 sm:flex-row">
                <p className="text-5xl font-bold">{averageRating}</p>
                <div>
                  <Rating value={averageRating} />
                  <p className="text-sm font-medium">
                    From {productDetail.reviews.length} reviewer
                  </p>
                </div>
              </div>
              <div className="mt-10 flex flex-col gap-4">
                {productDetail.reviews.length !== 0 &&
                  productDetail.reviews.map((review) => (
                    <Review review={review} />
                  ))}
              </div>
            </TabPanel>
          </div>
        </Card>
      )}
    </section>
  );
}

export default ProductDetailPage;
