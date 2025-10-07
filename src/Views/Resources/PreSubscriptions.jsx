import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';

const PreSubscriptions = () => {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  return (
    <Box sx={{ background: "white" }}>
      <Typography variant="h6" gutterBottom sx={{ padding: "23px" }}>
        Manage Subscription
      </Typography>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper sx={{ padding: 3, width: "600px", textAlign: 'left' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ marginBottom: 3, width: "50%", textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={() => setSelectedPlan('monthly')}
                sx={{
                  backgroundColor: selectedPlan === 'monthly' ? 'primary.main' : 'grey.300',
                  color: selectedPlan === 'monthly' ? 'white' : 'black',
                  flex: 1,
                  width: "30%",
                  margin: 0,
                  padding: '10px',
                  borderRadius: '4px 0 0 4px',
                }}
              >
                Monthly
              </Button>
              <Button
                variant="contained"
                onClick={() => setSelectedPlan('yearly')}
                sx={{
                  backgroundColor: selectedPlan === 'yearly' ? 'primary.main' : 'grey.300',
                  color: selectedPlan === 'yearly' ? 'white' : 'black',
                  flex: 1,
                  width: "30%",
                  margin: 0,
                  padding: '10px',
                  borderRadius: '0 4px 4px 0',
                }}
              >
                Yearly
              </Button>
            </Box>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            {selectedPlan === 'monthly' && (
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: "34px",
                        borderBottom: '2px solid black',
                        paddingBottom: '4px'
                      }}
                    >
                      Free
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: "34px",
                        marginLeft: 5,
                        color: "#0294D3"
                      }}
                    >
                      Basic
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        marginLeft: 5,
                        fontSize: "12px",
                        color: "black"
                      }}
                    >
                      Very Basic
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            {selectedPlan === 'yearly' && (
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: "34px",
                        borderBottom: '2px solid black',
                        paddingBottom: '4px'
                      }}
                    >
                      Starter
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: "34px",
                        marginLeft: 5,
                        color: "#0294D3"
                      }}
                    >
                      $1000
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        marginLeft: 5,
                        fontSize: "12px",
                        color: "black"
                      }}
                    >
                      very Basic
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Box>

          <Typography variant="body1" sx={{ marginBottom: 2, fontWeight: "bold", fontSize: "25px" }}>
            {selectedPlan === 'monthly' ? 'Plan includes :' : 'Plan includes :'}
          </Typography>

          {[1, 2, 3, 4, 5, 6, 7].map((benefit) => (
            <Typography variant="body1" key={benefit} sx={{ padding: "5px" }}>
              <CheckIcon fontSize="small" sx={{ verticalAlign: 'middle', marginRight: 1 }} />
              Lorem ipsum dolor sit amet elit lorem lorem ipsum dolor sit amet  {benefit}
            </Typography>
          ))}
          {selectedPlan === 'monthly' && (
            <Button onClick={() => navigate('/price')} sx={{ background: "#0294D3", color: "white", width: "100%", padding: "7px", marginTop: "4px" }}>Try for Free</Button>
          )}
          {selectedPlan === 'yearly' && (
            <Button onClick={() => navigate('/price')} sx={{ background: "#0294D3", color: "white", width: "100%", padding: "7px", marginTop: "4px" }}>Purchase</Button>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default PreSubscriptions;
