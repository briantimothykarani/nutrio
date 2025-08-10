

import { Grid, Typography, Link } from '@mui/material';

function LandingPageFooter() {
  return (
    <div className="bg-gray-800 text-white py-6">
      <Grid container spacing={4} justifyContent="space-between">
        <Grid item xs={12} md={3}>
          <Typography variant="h6">Hugs</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="body1">Quick Links</Typography>
          <ul>
            <li><Link href="/about" className="text-white">About Us</Link></li>
            <li><Link href="/contact" className="text-white">Contact</Link></li>
            <li><Link href="/help" className="text-white">Help</Link></li>
          </ul>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="body1">Follow Us</Typography>
          <ul className=" space-x-4">
            <li><Link href="#" className="text-white">Facebook</Link></li>
            <li><Link href="#" className="text-white">Twitter</Link></li>
            <li><Link href="#" className="text-white">Instagram</Link></li>
          </ul>
        </Grid>
      </Grid>
    </div>
  );
}

export default LandingPageFooter;