import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useState, type SyntheticEvent } from "react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileFollowings from "./ProfileFollowings";
// import ProfilePhotos_copy from "./ProfilePhotos_copy";

export default function ProfileContent() {
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    // 첫 번째 인자를 _로 쓴 건 그 인자를 실제로 사용하지 않는다는 신호야.프로그래밍 관습에서 언더스코어 하나(_)는 “이 값은 받아오긴 하지만 쓰지 않을 거야”라는 뜻으로, ESLint 같은 린터가 “정의해놓고 안 쓰는 변수”에 대해 경고하는 것을 피하기 위해 쓰기도 해.
    setValue(newValue);
  };
  const tabContent = [
    { label: "About", content: <div>About</div>, color: "#ff5722" },
    { label: "Photos", content: <ProfilePhotos />, color: "#ab47bc" },
    { label: "Events", content: <div>Events</div>, color: "#3f51b5" },
    { label: "Followers", content: <ProfileFollowings activeTab={value}/>, color: "#2196f3" },
    { label: "Following", content:  <ProfileFollowings activeTab={value}/>, color: "#80deea" },
  ];

  return (
    <Box
      component={Paper}
      mt={2}
      p={3}
      elevation={3}
      height={500}
      sx={{ display: "flex", alignItems: "flex-start", borderRadius: 3 }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 0.5, height: 450, minWidth: 200 }}
      >
        {tabContent.map((tab, index) => (
          <Tab
            key={index + 1}
            label={tab.label}
            sx={{ mr: 3, color: tab.color }}
            value={index}
          />
          
        )
        )
        }
      </Tabs>
      <Box sx={{ flexGrow: 1, p: 3 }}>{tabContent[value].content}</Box>
    </Box>
  );
}
