import { Container, Grid } from "@mui/material";

export type BaseLayoutProps = {
  children?:
    | [React.ReactNode, React.ReactNode, React.ReactNode]
    | [React.ReactNode, React.ReactNode];
};

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <Grid
      container
      display="grid"
      gridTemplateColumns="100%"
      gridTemplateRows={`${children?.length === 3 ? "auto " : ""}1fr auto`}
      minHeight="100vh"
      spacing={2}
    >
      {children?.length === 3 && <Grid size={12}>{children[0]}</Grid>}
      <Grid size={12}>
        <Container component="main" maxWidth="md">
          {children?.[children.length - 2]}
        </Container>
      </Grid>
      <Grid size={12}>{children?.[children.length - 1]}</Grid>
    </Grid>
  );
};
