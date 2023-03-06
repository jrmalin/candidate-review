import { Chip, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Candidate, ReviewStatus } from "./Candidate";

const BorderWrapper = styled.div`
  border: 1px solid white;
`;

const gridStyle = {
  display: "flex",
  textAlign: "left",
  alignItems: "center",
  justifyItems: "center",
  margin: "2px",
  flexGrow: 1,
  width: "50rem",
  maxWidth: "80vw",
};

type KeyValuePair = { key: string; value: string };

const SectionInfo = ({ infos }: { infos: KeyValuePair[] }) => {
  const IndentedSection = styled.div`
    margin-left: 2rem;
  `;

  return (
    <IndentedSection>
      {infos.map(({ key, value }) => (
        <Typography variant="h6" component="p" key={key}>
          {key}: {value}
        </Typography>
      ))}
    </IndentedSection>
  );
};

export const SingleCandidateOverview = ({
  candidate,
  setActiveCandidate,
}: {
  candidate: Candidate;
  setActiveCandidate?: () => void;
}) => {
  const Status = ({ status }: { status?: ReviewStatus }) => {
    if (!setActiveCandidate) {
      return null;
    }

    let color: "success" | "error" | "info";
    if (status === ReviewStatus.APPROVED) {
      color = "success";
    } else if (status === ReviewStatus.REJECTED) {
      color = "error";
    } else {
      color = "info";
    }

    return (
      <Chip
        label={`Status: ${status ?? ReviewStatus.PENDING}`}
        color={color}
        onClick={setActiveCandidate}
      />
    );
  };

  return (
    <BorderWrapper data-testid="candidate-overview">
      <Grid container sx={gridStyle} spacing={1}>
        <Grid item>
          <img src={candidate.picture.large} alt="candidate thumbnail" />
        </Grid>
        <Grid item>
          <Typography variant="h3" component="h2">
            <strong>
              {candidate.name.first} {candidate.name.last}
            </strong>
          </Typography>
          <Typography variant="h5" component="h3">
            <strong> Personal Information</strong>
          </Typography>
          <SectionInfo
            infos={[
              { key: "Gender", value: candidate.gender },
              { key: "Country", value: candidate.location.country },
            ]}
          />
          <Typography variant="h5" component="h3">
            <strong>Contact Information</strong>
          </Typography>
          <SectionInfo
            infos={[
              { key: "Phone", value: candidate.phone },
              { key: "Email", value: candidate.email },
            ]}
          />
        </Grid>
      </Grid>
      <Status status={candidate.status} />
    </BorderWrapper>
  );
};
