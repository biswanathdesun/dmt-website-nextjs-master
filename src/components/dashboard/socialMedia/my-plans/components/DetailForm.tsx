import * as React from "react";
import {
  Box,
  Grid,
  Divider,
  Typography,
  Button,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import * as Yup from "yup";
import ImageDrop from "@components/hook-form/ImageDrop";
import DeleteIcon from "@mui/icons-material/Delete";
import FormProvider from "@components/hook-form/FormProvider";
import RHFTextField from "@components/hook-form/RHFTextField";
import {
  SubmitHandler,
  useForm,
  useFieldArray,
  Controller
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import VideoDrop from "@/components/hook-form/VideoDrop";
import axios from "axios";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  createSocialMediaAsync,
  getSocialMediaByIdAsync
} from "@/redux/services/socialMedia";
import { LoadingButton } from "@mui/lab";

const NewListSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  city: Yup.string().required("City is required"),
  homeTown: Yup.string().required("HomeTown is required"),
  age: Yup.string().required("Age is required"),
  location: Yup.string().required("Location is required"),
  facebook: Yup.string()
    .url("Must be a valid URL")
    .required("Facebook Profile/Page link is required"),
  instagram: Yup.string()
    .url("Must be a valid URL")
    .required("Instagram Profile/Page link is required"),
  spotify: Yup.string()
    .url("Must be a valid URL")
    .required("Spotify Artist Profile link is required"),
  youtube: Yup.string()
    .url("Must be a valid URL")
    .required("Youtube Channel link is required"),
  songs: Yup.array().of(
    Yup.object({
      url: Yup.string().url("Must be a valid URL").required("Song is required")
    })
  ),
  cameraTeam: Yup.string().required("Camera Team is required")
});

interface FormValues {
  name: string;
  stageName: string;
  city: string;
  homeTown: string;
  age: string;
  location: string;
  facebook: string;
  instagram: string;
  spotify: string;
  youtube: string;
  songs: { url: string }[];
  collaborations: { url: string }[];
  reels: { url: string }[];
  articles: { url: string }[];
  upcoming: { url: string }[];
  cameraTeam: string;
  images: { file: File | null }[];
  videos: { file: File | null }[];
}

interface SocialData {
  name?: string;
  age?: number;
  bestPerformances?: string[];
  cameraTeam?: string;
  cityYouLiveIn?: string;
  collaborations?: string[];
  facebookLink?: string;
  homeTown?: string;
  images?: { file: File | null }[] | any;
  instagramLink?: string;
  location?: string;
  mediaArticles?: string[];
  shortVideo?: { file: File | null }[] | any;
  spotifyLink?: string;
  stageName?: string;
  topSongs?: string[];
  upcomingSongs?: string[];
  youtubeLink?: string;
  _id?: string;
}

interface DetailFormProps {
  setSubmitForm?: React.Dispatch<React.SetStateAction<FormValues>>;
  activeTab: number;
  handleBack: () => void;
  steps: { label: string; content: string }[];
  handleNext: () => void;
  type: string;
}

const DetailForm: React.FC<DetailFormProps> = ({
  // setFormData,
  setSubmitForm,
  activeTab,
  handleBack,
  steps,
  handleNext,
  type
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [imageLoading, setImageLoading] = React.useState<boolean[]>([]);
  const [uploadedImageURLs, setUploadedImageURLs] = React.useState<
    { url: string }[]
  >([]);
  const [videoLoading, setVideoLoading] = React.useState<boolean[]>([]);
  const [videoURLs, setVideoURLs] = React.useState<{ url: string }[]>([]);
  const { socialDataByUserId, isLoading } = useSelector(
    (state: RootState) => state?.socialMedia
  );
  const {
    name,
    age,
    bestPerformances,
    cameraTeam,
    cityYouLiveIn,
    collaborations,
    facebookLink,
    homeTown,
    images,
    instagramLink,
    location,
    mediaArticles,
    shortVideo,
    spotifyLink,
    stageName,
    topSongs,
    upcomingSongs,
    youtubeLink,
    _id
  } = (socialDataByUserId as SocialData) ?? {};

  const isEdit = Object.keys(socialDataByUserId).length > 0;

  const defaultValues = React.useMemo(
    () => ({
      name: "",
      stageName: "",
      city: "",
      homeTown: "",
      age: "",
      location: "",
      facebook: "",
      instagram: "",
      spotify: "",
      youtube: "",
      songs: isEdit && topSongs?.length ? topSongs : [{ url: "" }],
      collaborations: [{ url: "" }],
      reels: [{ url: "" }],
      articles: [{ url: "" }],
      upcoming: [{ url: "" }],
      cameraTeam: "",
      images:
        isEdit && images?.length
          ? images?.map((item: { url: string }) => {
              file: item?.url;
            })
          : [{ file: null }],
      videos:
        isEdit && shortVideo?.length
          ? shortVideo?.map((item: { url: string }) => {
              file: item?.url;
            })
          : [{ file: null }]
    }),
    [socialDataByUserId]
  );

  const methods = useForm<FormValues | any>({
    resolver: yupResolver(NewListSchema),
    defaultValues
  });

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
    getValues
  } = methods;

  const {
    fields: songFields,
    append: appendSong,
    remove: removeSong
  } = useFieldArray({
    control: control,
    name: "songs"
  });

  const {
    fields: collaborationFields,
    append: appendCollaboration,
    remove: removeCollaboration
  } = useFieldArray({
    control: control,
    name: "collaborations"
  });

  const {
    fields: reelFields,
    append: appendReel,
    remove: removeReel
  } = useFieldArray({
    control: control,
    name: "reels"
  });

  const {
    fields: articleFields,
    append: appendArticle,
    remove: removeArticle
  } = useFieldArray({
    control: control,
    name: "articles"
  });

  const {
    fields: upcomingFields,
    append: appendUpcoming,
    remove: removeUpcoming
  } = useFieldArray({
    control: control,
    name: "upcoming"
  });

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage
  } = useFieldArray({
    control: control,
    name: "images"
  });

  const {
    fields: videoFields,
    append: appendVideo,
    remove: removeVideo
  } = useFieldArray({
    control: control,
    name: "videos"
  });

  const handleUpload = async (file: File, index: number) => {
    const formData = new FormData();
    formData.append("track", file);
    const token = localStorage.getItem("token");

    try {
      setImageLoading((prev) => {
        const newLoading = [...prev];
        newLoading[index] = true;
        return newLoading;
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}orders/upload-song`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );

      const { url } = response.data;

      setUploadedImageURLs((prev) => {
        const newURLs = [...prev];
        newURLs[index] = { url };
        return newURLs;
      });
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setImageLoading((prev) => {
        const newLoading = [...prev];
        newLoading[index] = false;
        return newLoading;
      });
    }
  };

  const handleFileUpload = (file: File | null, index: number) => {
    if (file && file instanceof File) {
      handleUpload(file, index);
    } else {
      console.error("Invalid file");
    }
  };

  const uploadVideo = async (index: number, file: File) => {
    const formData = new FormData();
    formData.append("track", file);
    const token = localStorage.getItem("token");

    try {
      setVideoLoading((prev) => {
        const newLoading = [...prev];
        newLoading[index] = true;
        return newLoading;
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}orders/upload-song`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );

      const { url } = response.data;

      setVideoURLs((prev) => {
        const newURLs = [...prev];
        newURLs[index] = { url };
        return newURLs;
      });
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setVideoLoading((prev) => {
        const newLoading = [...prev];
        newLoading[index] = false;
        return newLoading;
      });
    }
  };

  const handleVideoUpload = async (index: number, file: File) => {
    if (file && file instanceof File) {
      uploadVideo(index, file);
    } else {
      console.error("Invalid file");
    }
  };
  function removeEmptyKeys(obj: any) {
    for (const key in obj) {
      if (
        typeof obj[key] === "object" &&
        !Array.isArray(obj[key]) &&
        obj[key] !== null
      ) {
        // Recursively clean nested objects
        removeEmptyKeys(obj[key]);
        // Remove the key if it's now an empty object
        if (Object.keys(obj[key]).length === 0) {
          delete obj[key];
        }
      } else if (Array.isArray(obj[key])) {
        // Check if the key is 'collaborations' and filter out objects without 'url'

        // Filter out empty objects in other arrays
        obj[key] = obj[key].filter((item) => {
          if (typeof item === "object" && item !== null) {
            removeEmptyKeys(item);
            return item.url && item.url.trim() !== "";
          }
          return false;
        });

        // Remove the key if it's now an empty array
        if (obj[key].length === 0) {
          delete obj[key];
        }
      } else if (obj[key] === "" || obj[key] === null) {
        // Remove the key if it's an empty string or null
        delete obj[key];
      }
    }
    return obj;
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const payload = {
      name: data?.name,
      stageName: data?.stageName,
      cityYouLiveIn: data?.city,
      homeTown: data?.homeTown,
      age: Number(data?.age),
      location: data?.location,
      facebookLink: data?.facebook,
      instagramLink: data?.instagram,
      spotifyLink: data?.spotify,
      youtubeLink: data?.youtube,
      topSongs: data?.songs,
      collaborations: data?.collaborations,
      bestPerformances: data?.reels,
      mediaArticles: data?.articles,
      upcomingSongs: data?.upcoming,
      cameraTeam: data?.cameraTeam,
      shortVideo: videoURLs,
      images: uploadedImageURLs,
      socialMediaId: _id
    };
    if (!socialDataByUserId) {
      delete payload?.socialMediaId;
    }
    const payloadData = removeEmptyKeys(payload);

    dispatch(createSocialMediaAsync(payloadData)).then((res) => {
      if (res?.payload?.statusCode === 200) {
        handleNext();
      }
    });
    // if (setSubmitForm) setSubmitForm(payload);
  };

  React.useEffect(() => {
    dispatch(getSocialMediaByIdAsync());
  }, []);

  React.useEffect(() => {
    if (socialDataByUserId) reset(defaultValues);
  }, [socialDataByUserId]);

  React.useEffect(() => {
    if (isEdit) {
      setValue("name", name);
      setValue("stageName", stageName);
      setValue("city", cityYouLiveIn);
      setValue("homeTown", homeTown);
      setValue("age", age);
      setValue("location", location);
      setValue("facebook", facebookLink);
      setValue("collaborations", collaborations);
      setValue("reels", bestPerformances);
      setValue("articles", mediaArticles);
      setValue("upcoming", upcomingSongs);
      setValue("cameraTeam", cameraTeam);
      setValue("spotify", spotifyLink);
      setValue("youtube", youtubeLink);
      setValue("songs", topSongs);
      setValue("instagram", instagramLink);
      setValue(
        "images",
        images?.map((item: { url: string }) => {
          file: item?.url;
        })
      );
      setValue(
        "videos",
        shortVideo?.map((item: { url: string }) => {
          file: item?.url;
        })
      );
      setVideoURLs(shortVideo ?? []);
      setUploadedImageURLs(images);
    }
  }, [socialDataByUserId, setValue]);

  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <RHFTextField name="name" label="Name*" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <RHFTextField name="stageName" label="Stage Name" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <RHFTextField name="city" label="City You Live In*" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <RHFTextField name="homeTown" label="Home Town*" />
          </Grid>
          <Grid item xs={12} my={4}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Target Audience</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <RHFTextField type="number" name="age" label="Age*" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <RHFTextField name="location" label="Location*" />
          </Grid>
          <Grid item xs={12} my={4}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Social Links</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <RHFTextField name="facebook" label="Facebook Profile/Page Link*" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <RHFTextField
              name="instagram"
              label="Instagram Profile/Page Link*"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <RHFTextField name="spotify" label="Spotify Artist Profile Link*" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <RHFTextField name="youtube" label="Youtube Channel Link*" />
          </Grid>
          <Grid item xs={12} my={4}>
            <Divider />
          </Grid>
          {/* Songs */}
          <Grid item xs={12} sm={4}>
            {songFields.map((field, index) => (
              <Box
                key={field.id}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <RHFTextField
                  name={`songs.${index}.url`}
                  label="Links for top songs (max 5)*"
                  fullWidth
                />
                {songFields.length > 1 && (
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeSong(index)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            {songFields.length < 5 && (
              <Button onClick={() => appendSong({ url: "" })}>
                + Add Song
              </Button>
            )}
          </Grid>
          {/* Collaborations */}
          <Grid item xs={12} sm={4}>
            {collaborationFields.map((field, index) => (
              <Box
                key={field.id}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <RHFTextField
                  name={`collaborations.${index}.url`}
                  label="Link for top collaborations"
                  fullWidth
                />
                {collaborationFields.length > 1 && (
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeCollaboration(index)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            <Button onClick={() => appendCollaboration({ url: "" })}>
              + Add Collaboration
            </Button>
          </Grid>
          {/* Reels */}
          <Grid item xs={12} sm={4}>
            {reelFields.map((field, index) => (
              <Box
                key={field.id}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <RHFTextField
                  name={`reels.${index}.url`}
                  label="Reels on instagram"
                  fullWidth
                />
                {reelFields.length > 1 && (
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeReel(index)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            <Button onClick={() => appendReel({ url: "" })}>+ Add Reel</Button>
          </Grid>
          {/* Articles */}
          <Grid item xs={12} sm={4}>
            {articleFields.map((field, index) => (
              <Box
                key={field.id}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <RHFTextField
                  name={`articles.${index}.url`}
                  label="Links for top articles"
                  fullWidth
                />
                {articleFields.length > 1 && (
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeArticle(index)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            <Button onClick={() => appendArticle({ url: "" })}>
              + Add Article
            </Button>
          </Grid>
          {/* Upcoming */}
          <Grid item xs={12} sm={4}>
            {upcomingFields.map((field, index) => (
              <Box
                key={field.id}
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <RHFTextField
                  name={`upcoming.${index}.url`}
                  label="Link for upcoming songs"
                  fullWidth
                />
                {upcomingFields.length > 1 && (
                  <IconButton
                    aria-label="delete"
                    onClick={() => removeUpcoming(index)}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            ))}
            <Button onClick={() => appendUpcoming({ url: "" })}>
              + Add Upcoming Songs
            </Button>

            <Typography color="error" variant="body2">
              Note: Link should be listenable or downloadable link
            </Typography>
          </Grid>
          {/* Camera Team */}
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" mb={2}>
              Camera team*
            </Typography>
            <Controller
              name="cameraTeam"
              control={control}
              defaultValue=""
              render={({ field, fieldState: { error } }) => (
                <div>
                  <RadioGroup row {...field}>
                    <FormControlLabel
                      value="professional"
                      control={<Radio />}
                      label="Professional"
                    />
                    <FormControlLabel
                      value="personally"
                      control={<Radio />}
                      label="Personally Arranged"
                    />
                  </RadioGroup>
                  {error && (
                    <Typography variant="body2" color="error">
                      {error.message}
                    </Typography>
                  )}
                </div>
              )}
            />
          </Grid>
          <Grid item xs={12} my={4}>
            <Divider />
          </Grid>
          {/* Images */}
          <Grid item xs={12}>
            <Typography variant="h6">Upload Images</Typography>
          </Grid>
          {imageFields.map((field, index) => (
            <Grid item xs={12} sm={4} key={field.id}>
              <Controller
                name={`images.${index}.file`}
                control={control}
                render={({ field }) => (
                  <ImageDrop
                    // career={{ cover: undefined }}
                    error={undefined}
                    firstslidedata={{ cover: undefined }}
                    formData={uploadedImageURLs?.[index]?.url ?? ""}
                    setFormData={(file) => handleFileUpload(file, index)}
                    setFiledata={(file) => handleFileUpload(file, index)}
                    filedata={uploadedImageURLs?.[index]?.url ?? ""}
                    setSaveimage={(file) => handleFileUpload(file, index)}
                    saveImage={uploadedImageURLs?.[index]?.url ?? ""}
                    instruction=""
                    buttonText="Upload Image"
                    loading={imageLoading[index]}
                    acceptedFileTypes={{
                      "image/jpeg": [],
                      "image/png": []
                    }}
                  />
                )}
              />
              {imageFields.length > 1 && (
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    removeImage(index);
                    const updatedData = uploadedImageURLs?.filter(
                      (item, ind) => ind != index
                    );
                    setUploadedImageURLs(updatedData);
                  }}
                  sx={{ mt: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
          ))}
          {imageFields.length < 5 && (
            <Grid item xs={12}>
              <Button onClick={() => appendImage({ file: null })}>
                + Add Image
              </Button>
            </Grid>
          )}

          <Grid item xs={12}>
            <Typography variant="h6">Upload Video</Typography>
          </Grid>
          {videoFields?.map((field, index) => (
            <Grid item xs={12} sm={4} key={field.id}>
              <Controller
                name={`videos.${index}.file`}
                control={control}
                render={({ field }) => (
                  <VideoDrop
                    error={undefined}
                    formData={videoURLs[index]?.url ?? ""}
                    setFormData={(file) => {
                      handleVideoUpload(index, file);
                    }}
                    setFiledata={(file) => {
                      handleVideoUpload(index, file);
                    }}
                    filedata={videoURLs[index]?.url ?? ""}
                    setSaveVideo={(file) => {
                      handleVideoUpload(index, file);
                    }}
                    saveVideo={videoURLs[index]?.url ?? ""}
                    instruction=""
                    buttonText="Upload Short Video"
                    loading={videoLoading[index]}
                    acceptedFileTypes={{
                      "video/*": []
                    }}
                  />
                )}
              />
              {videoFields.length > 1 && (
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    removeVideo(index);
                    const updatedData = videoURLs?.filter(
                      (item, ind) => ind != index
                    );
                    setVideoURLs(updatedData);
                  }}
                  sx={{ mt: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
          ))}
          {videoFields.length < 5 && (
            <Grid item xs={12}>
              <Button onClick={() => appendVideo({ file: null })}>
                + Add Video
              </Button>
            </Grid>
          )}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4
          }}
        >
          <Button
            disabled={activeTab === 0}
            onClick={handleBack}
            variant="contained"
            color="inherit"
          >
            Back
          </Button>
          <LoadingButton loading={isLoading} type="submit" variant="contained">
            {activeTab === steps.length - 1 ? "Finish" : "Next"}
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default DetailForm;
