import RHFAutocomplete from "@/components/hook-form/RHFAutocomplete";
import RHFTextField from "@/components/hook-form/RHFTextField";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface SocialLink {
  platform: string;
  link: string;
}

interface ArtistDetail {
  name: string;
  socialLink: SocialLink[];
  showSocialLink: boolean;
  role: string;
  artistsType: string;
}

interface Props {
  setDetails: React.Dispatch<React.SetStateAction<ArtistDetail[]>>;
  index: number;
  defaultArtist: ArtistDetail[];
  defaultContributor: ArtistDetail[];
}

const platforms = [
  { value: "spotifyid", label: "Spotify" },
  { value: "appleid", label: "Apple" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "Youtube" }
];
const roles = [
  "Lyricist",
  "Composer",
  "Arranger",
  "Orchestra",
  "Choir",
  "Actor",
  "Actress"
];

const ArtistContributorForm: React.FC<Props> = ({
  setDetails,
  index,
  defaultArtist,
  defaultContributor
}) => {
  const [artists, setArtists] = useState<ArtistDetail[]>([]);
  const [contributors, setContributors] = useState<ArtistDetail[]>([]);
  const [errorsLocal, setErrorsLocal] = useState<{ [key: string]: string }>({});

  const {
    control,
    setValue,
    formState: { errors }
  } = useFormContext();

  useEffect(() => {
    if (defaultContributor?.length || defaultArtist?.length) {
      const mapDetails = (details: any[], type: "artist" | "contributor") => {
        return details?.map((value) => {
          const socialLink = [
            value?.spotifyid && {
              platform: "spotifyid",
              link: value.spotifyid
            },
            value?.appleid && { platform: "appleid", link: value.appleid },
            value?.facebook && { platform: "facebook", link: value.facebook },
            value?.instagram && {
              platform: "instagram",
              link: value.instagram
            },
            value?.youtube && { platform: "youtube", link: value.youtube }
          ].filter(Boolean);

          return {
            name: value?.name,
            role: value?.role,
            artistsType: type,
            socialLink: socialLink.length > 0 ? socialLink : [],
            showSocialLink: socialLink.length > 0
          };
        });
      };

      setContributors(mapDetails(defaultContributor, "contributor") || []);
      setArtists(mapDetails(defaultArtist, "artist") || []);
    }
  }, [defaultArtist, defaultContributor]);

  const mergeDetails = () => {
    const detailData = [...artists, ...contributors];
    setDetails(detailData);
  };

  const handleAddDetail = (type: "artist" | "contributor") => {
    const newDetail: ArtistDetail = {
      name: "",
      role: type === "artist" ? "primary" : "",
      artistsType: type,
      socialLink: [{ platform: "", link: "" }],
      showSocialLink: false
    };

    if (type === "artist") {
      setArtists((prev) => [...prev, newDetail]);
    } else {
      setContributors((prev) => [...prev, newDetail]);
    }
  };

  const handleRemoveDetail = (
    index: number,
    type: "artist" | "contributor"
  ) => {
    if (type === "artist") {
      setArtists((prev) => prev.filter((_, i) => i !== index));
    } else {
      setContributors((prev) => prev.filter((_, i) => i !== index));
    }
    mergeDetails();
  };

  const handleDetailChange = (
    index: number,
    field: keyof ArtistDetail,
    value: any,
    type: "artist" | "contributor"
  ) => {
    const update = (details: ArtistDetail[]) =>
      details.map((detail, i) =>
        i === index ? { ...detail, [field]: value } : detail
      );

    if (type === "artist") {
      setArtists((prev) => update(prev));
    } else {
      setContributors((prev) => update(prev));
    }

    if (field === "name" && !value.trim()) {
      if (type === "contributor" && !value.includes(" ")) {
        setErrorsLocal((prev) => ({
          ...prev,
          [`${type}-${index}`]: "Full name (first and last) is required"
        }));
      } else {
        setErrorsLocal((prev) => ({
          ...prev,
          [`${type}-${index}`]: "Name is required"
        }));
      }
    } else {
      setErrorsLocal((prev) => {
        const { [`${type}-${index}`]: removed, ...rest } = prev;
        return rest;
      });
    }

    mergeDetails();
  };

  const handleLinkChange = (
    artistIndex: number,
    linkIndex: number,
    field: keyof SocialLink,
    value: string,
    type: "artist" | "contributor"
  ) => {
    const update = (details: ArtistDetail[]) =>
      details.map((detail, i) => {
        if (i === artistIndex) {
          const newLinks = detail.socialLink.map((link, j) =>
            j === linkIndex ? { ...link, [field]: value } : link
          );
          return { ...detail, socialLink: newLinks };
        }
        return detail;
      });

    if (type === "artist") {
      setArtists((prev) => update(prev));
    } else {
      setContributors((prev) => update(prev));
    }
    mergeDetails();
  };

  const handleAddLink = (
    artistIndex: number,
    type: "artist" | "contributor"
  ) => {
    const update = (details: ArtistDetail[]) =>
      details.map((detail, i) =>
        i === artistIndex
          ? {
              ...detail,
              socialLink: [...detail.socialLink, { platform: "", link: "" }]
            }
          : detail
      );

    if (type === "artist") {
      setArtists((prev) => update(prev));
    } else {
      setContributors((prev) => update(prev));
    }
    mergeDetails();
  };

  const handleRemoveLink = (
    artistIndex: number,
    linkIndex: number,
    type: "artist" | "contributor"
  ) => {
    const update = (details: ArtistDetail[]) =>
      details.map((detail, i) => {
        if (i === artistIndex) {
          const newLinks = detail.socialLink.filter((_, j) => j !== linkIndex);
          return { ...detail, socialLink: newLinks };
        }
        return detail;
      });

    if (type === "artist") {
      setArtists((prev) => update(prev));
    } else {
      setContributors((prev) => update(prev));
    }
    mergeDetails();
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    artists.forEach((artist, index) => {
      if (!artist.name.trim()) {
        newErrors[`artist-${index}`] = "Name is required";
      }
    });

    contributors.forEach((contributor, index) => {
      const name = contributor.name.trim();
      if (!name || !name?.includes(" ")) {
        newErrors[`contributor-${index}`] =
          "Please enter a valid full name (first and last name)";
      }
    });

    setErrorsLocal(newErrors);
  };

  useEffect(() => {
    mergeDetails();
  }, [artists, contributors]);

  useEffect(() => {
    if (errors || Object.keys(errorsLocal)?.length) {
      handleSubmit();
    }
  }, [errors, index]);
  return (
    <>
      <Box sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Artist Details*
        </Typography>
        <Grid container sx={{ mb: 2, gap: 2 }}>
          {artists.map((detail, detailIndex) => (
            <Grid key={detailIndex} item sm={5.8}>
              <Box
                component="form"
                sx={{ padding: 2, boxShadow: 1, borderRadius: 2 }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {artists.length > 1 && detailIndex > 0 && (
                    <IconButton
                      onClick={() => handleRemoveDetail(detailIndex, "artist")}
                      sx={{
                        alignSelf: "end",
                        color: "#ff8B00",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                          color: "#ff8B00",
                          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)"
                        },
                        mb: 1
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Grid>

                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <RHFTextField
                      size="small"
                      label="Name"
                      name="tracks-artists-name"
                      fullWidth
                      required
                      value={detail.name}
                      onChange={(e) =>
                        handleDetailChange(
                          detailIndex,
                          "name",
                          e.target.value,
                          "artist"
                        )
                      }
                    />
                    {errorsLocal[`artist-${detailIndex}`] && (
                      <FormHelperText error>
                        {errorsLocal[`artist-${detailIndex}`]}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Switch
                          checked={detail.role === "primary"}
                          disabled={detailIndex <= 0}
                          onChange={(e) =>
                            handleDetailChange(
                              detailIndex,
                              "role",
                              e.target.checked ? "primary" : "featuring",
                              "artist"
                            )
                          }
                        />
                        <Typography variant="body1" sx={{ ml: 1 }}>
                          {detail.role === "primary"
                            ? "(Primary Artist)"
                            : "(Featuring Artist)"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end"
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          textTransform: "capitalize",
                          color: "white"
                        }}
                        onClick={() =>
                          handleDetailChange(
                            detailIndex,
                            "showSocialLink",
                            !detail.showSocialLink,
                            "artist"
                          )
                        }
                      >
                        {detail.showSocialLink
                          ? "Hide Artist Profile Links"
                          : "Add Artist Profile Links"}
                      </Button>
                    </Box>
                  </Grid>

                  {detail.showSocialLink && (
                    <Grid item xs={12}>
                      {detail.socialLink.map((socialLink, linkIndex) => (
                        <Grid
                          container
                          spacing={2}
                          alignItems="center"
                          key={linkIndex}
                          sx={{ mb: 2 }}
                        >
                          <Grid item xs={5.2}>
                            <TextField
                              fullWidth
                              size="small"
                              select
                              label="Platform"
                              value={socialLink.platform}
                              onChange={(e) =>
                                handleLinkChange(
                                  detailIndex,
                                  linkIndex,
                                  "platform",
                                  e.target.value,
                                  "artist"
                                )
                              }
                              required
                            >
                              {platforms.map((platform) => (
                                <MenuItem
                                  key={platform.value}
                                  value={platform.value}
                                >
                                  {platform.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={5.2}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Link"
                              value={socialLink.link}
                              onChange={(e) =>
                                handleLinkChange(
                                  detailIndex,
                                  linkIndex,
                                  "link",
                                  e.target.value,
                                  "artist"
                                )
                              }
                              required
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              onClick={() =>
                                handleRemoveLink(
                                  detailIndex,
                                  linkIndex,
                                  "artist"
                                )
                              }
                              disabled={detail.socialLink.length === 1}
                              sx={{ color: "#ff8B00" }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                      <Button
                        variant="contained"
                        onClick={() => handleAddLink(detailIndex, "artist")}
                        sx={{
                          mr: 2,
                          textTransform: "capitalize",
                          color: "white"
                        }}
                      >
                        Add Links
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: "capitalize", color: "white" }}
        onClick={() => handleAddDetail("artist")}
      >
        Add Artist
      </Button>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Contributor Details*
        </Typography>
        <Grid container sx={{ mb: 2, gap: 2 }}>
          {contributors.map((detail, detailIndex) => (
            <Grid key={detailIndex} item sm={5.8}>
              <Box
                component="form"
                sx={{ padding: 2, boxShadow: 1, borderRadius: 2 }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {contributors.length > 2 && detailIndex > 1 && (
                    <IconButton
                      onClick={() =>
                        handleRemoveDetail(detailIndex, "contributor")
                      }
                      sx={{
                        alignSelf: "end",
                        color: "#ff8B00",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                          color: "#ff8B00",
                          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)"
                        },
                        mb: 1
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Grid>

                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <RHFAutocomplete
                      name={`role-contributor-${detailIndex}`}
                      label="Role"
                      size="small"
                      options={roles}
                      disabled={detailIndex <= 1}
                      value={detail.role}
                      onChange={(event, newValue) => {
                        handleDetailChange(
                          detailIndex,
                          "role",
                          newValue,
                          "contributor"
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <RHFTextField
                      size="small"
                      label="Name"
                      name={`tracks-contributor-name`}
                      required
                      value={detail.name}
                      onChange={(e) =>
                        handleDetailChange(
                          detailIndex,
                          "name",
                          e.target.value,
                          "contributor"
                        )
                      }
                    />
                    {errorsLocal[`contributor-${detailIndex}`] && (
                      <FormHelperText error>
                        {errorsLocal[`contributor-${detailIndex}`]}
                      </FormHelperText>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end"
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          textTransform: "capitalize",
                          color: "white"
                        }}
                        onClick={() =>
                          handleDetailChange(
                            detailIndex,
                            "showSocialLink",
                            !detail.showSocialLink,
                            "contributor"
                          )
                        }
                      >
                        {detail.showSocialLink
                          ? "Hide Contributor Profile Links"
                          : "Add Contributor Profile Links"}
                      </Button>
                    </Box>
                  </Grid>

                  {detail.showSocialLink && (
                    <Grid item xs={12}>
                      {detail.socialLink.map((socialLink, linkIndex) => (
                        <Grid
                          container
                          spacing={2}
                          alignItems="center"
                          key={linkIndex}
                          sx={{ mb: 2 }}
                        >
                          <Grid item xs={5.2}>
                            <TextField
                              fullWidth
                              size="small"
                              select
                              label="Platform"
                              value={socialLink.platform}
                              onChange={(e) =>
                                handleLinkChange(
                                  detailIndex,
                                  linkIndex,
                                  "platform",
                                  e.target.value,
                                  "contributor"
                                )
                              }
                              required
                            >
                              {platforms.map((platform) => (
                                <MenuItem
                                  key={platform.value}
                                  value={platform.value}
                                >
                                  {platform.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={5.2}>
                            <TextField
                              fullWidth
                              size="small"
                              label="Link"
                              value={socialLink.link}
                              onChange={(e) =>
                                handleLinkChange(
                                  detailIndex,
                                  linkIndex,
                                  "link",
                                  e.target.value,
                                  "contributor"
                                )
                              }
                              required
                            />
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              onClick={() =>
                                handleRemoveLink(
                                  detailIndex,
                                  linkIndex,
                                  "contributor"
                                )
                              }
                              disabled={detail.socialLink.length === 1}
                              sx={{ color: "#ff8B00" }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleAddLink(detailIndex, "contributor")
                        }
                        sx={{
                          mr: 2,
                          textTransform: "capitalize",
                          color: "white"
                        }}
                      >
                        Add Links
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: "capitalize", color: "white" }}
        onClick={() => handleAddDetail("contributor")}
      >
        Add Contributor
      </Button>
    </>
  );
};

export default ArtistContributorForm;
