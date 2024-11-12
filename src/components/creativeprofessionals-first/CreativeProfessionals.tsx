"use client";
import {
  Box,
  Button,
  Tabs,
  Tab,
  Typography,
  Container,
  CardContent,
  Card,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import ContactForm from "@/components/creativeprofessionals-first/ContactForm";
import CreativeProfessionalshead from "@/components/creativeprofessionals-first/contenttab/CreativeProfessionalshead";
import AddContact from "./add/AddContact";
import Listen from "./contenttab/Listen";
import YouTube from "./contenttab/Youtube";
import Event from "./contenttab/Event";
import Gallery from "./contenttab/Gallery";
import Imagecard5 from "@public/images/portfolio/Imagecard5.png";
import { useDispatch, useSelector } from "react-redux";
import { getCreateProfessionalFirst } from "@/redux/services/creativeprofessionals";
import { AppDispatch, RootState } from "@/redux/store";

interface ButtonConfig {
  text: string; 
}

const buttonStyles = {
  borderRadius: "25px",
  border: "2px solid white",
  padding: { xs: "8px 16px", md: "12px 24px" },
  color: "#ffffff",
  textTransform: "none",
  fontWeight: "bold",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  "&:focus": {
    outline: "none",
  },
};

const buttonConfigs = [
  {
    text: "Listen",
  },
  {
    text: "Video",
  },
  {
    text: "Event",
  },
  {
    text: "Gallery",
  },
  {
    text: "Contact",
  },
];

const CreativeProfessionals: React.FC = (prop, ref) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [value, setValue] = useState<number>(selectedTab);
 const { 
  professionalLoader,
  professionalDataFirst,
  professionalDataSecond,
  professionalDataThird,
  removeLoader
} = useSelector((state :RootState) => state?.professional);
const dispatch: AppDispatch=useDispatch()

  // console.log(professionalDataFirst,"professionalDataFirst")
  // useEffect(()=>{
  // dispatch(getCreateProfessionalFirst())
  // },[])
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    handleTabChange(event, newValue);
  };
  const setRef = (index: number) => (element: HTMLDivElement | null) => {
    sectionRefs.current[index] = element;
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    sectionRefs.current[newValue]?.scrollIntoView({ behavior: "smooth" });
  };

  const [dialogOpenAddContact, setDialogOpenAddContact] = useState(false);
  const handleOpenAddContactDialog = () => {
    setDialogOpenAddContact(true);
  };

  const handleCloseAddContactDialog = () => {
    setDialogOpenAddContact(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) {
              setSelectedTab(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <Box sx={{ overflowX: "hidden", backgroundColor: "#120909" }}>
      <CreativeProfessionalshead />
      <Box
        sx={{
          backgroundColor: "#120909",
          textAlign: "center",
          py: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: "#FB8E0B" } }}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {buttonConfigs.map(({ text }) => (
            <Tab
              key={text}
              label={text}
              sx={{
                margin: { xs: 1, md: "12px" },
                borderRadius: "25px",
                padding: { xs: "8px 16px", md: "12px 24px" },
                color: "#ffffff",
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                "&:hover": {
                  background: `#FB8E0B`,
                  color: "black",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
                },
                fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
              }}
            />
          ))}
        </Tabs>
      </Box>
      <Box ref={setRef(0)} sx={{ py: 4, px: 2, backgroundColor: "#120909" }}>
        <Listen />
      </Box>

      <Box ref={setRef(1)} sx={{ py: 4, px: 2, backgroundColor: "#120909" }}>
        <YouTube />
      </Box>

      <Box ref={setRef(2)} sx={{ py: 4, px: 2, backgroundColor: "#120909" }}>
        <Event />
      </Box>

      <Box ref={setRef(3)} sx={{ py: 4, px: 2, backgroundColor: "#120909" }}>
        <Gallery />
      </Box>

      <Box ref={setRef(4)} sx={{ py: 4, px: 2, backgroundColor: "#120909" }}>
        <Typography
          gutterBottom
          variant="h2"
          color="white"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: {
              xs: "2rem",
              sm: "3.5rem",
              lg: "4rem",
            },
          }}
        >
          Contact
          <Button
            size="small"
            sx={{
              ...buttonStyles,
              backgroundColor: "#000",
              color: "#fff",
              marginLeft: { xs: 2, sm: 4 },
            }}
            onClick={handleOpenAddContactDialog}
          >
            +ADD
          </Button>
          <AddContact
            open={dialogOpenAddContact}
            onClose={handleCloseAddContactDialog}
          />
        </Typography>
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            mb: 4,
          }}
        >
          <ContactForm />
        </Container>
      </Box>

      <Box sx={{ backgroundColor: "120909   ", textAlign: "center", py: 2 }}>
        <Box
          sx={{
            position: "relative",
            height: "500px",
            overflow: "hidden",
          }}
        >
          {/* Blurred Background */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${Imagecard5.src})`,
              backgroundSize: "cover",
              filter: "blur(50px)",
              zIndex: 0,
            }}
          />

          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              background: "linear-gradient(135deg, #FF6F00 30%, #FF3D00 90%)", // Gradient color
              borderRadius: 7,
              boxShadow: 3,
              maxWidth: "900px",
              color: "white",
              fontSize: "24px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          >
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                color={"black"}
                component="div"
                sx={{ m: 3 }}
              >
                Would you like a free showcase page just like Deliver My Tune?
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#FB8E0B", // Button color
                    color: "#00000",
                    fontStyle: "normal",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "270px",
                    textTransform: "none",
                    borderRadius: "50px",
                    "&:hover": {
                      backgroundColor: "#e67e22", // Slightly darker color on hover
                    },
                  }}
                >
                  Join Deliver My Tune for Free
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default CreativeProfessionals;
