import {
  Paper,
  Typography,
  List,
  ListItem,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container } from "@components/common";


// Styled components for consistent design
const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  background: "white",
  borderRadius: theme.spacing(2),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2, 0),
  borderRadius: theme.spacing(2),
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
}));

const MainTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(3),
  textAlign: "center",
  color: "#0C3373",
  fontSize: "2.5rem",
  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  color: "#34495e",
  fontSize: "1.5rem",
  borderBottom: "2px solid #3498db",
  paddingBottom: theme.spacing(1),
}));

const SubSectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  color: "#2c3e50",
  fontSize: "1.2rem",
}));

const ContentText = styled(Typography)(({ theme }) => ({
  lineHeight: 1.8,
  marginBottom: theme.spacing(2),
  fontSize: "1rem",
  color: "#555",
}));

const StyledList = styled(List)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  "& .MuiListItem-root": {
    paddingLeft: theme.spacing(1),
    fontSize: "1rem",
    color: "#555",
    lineHeight: 1.6,
  },
}));

const HighlightBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#ecf0f1",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
  borderLeft: "4px solid #3498db",
}));

export default function TermsAndConditions() {
  return (
    <Container>
      <StyledPaper>
        <MainTitle variant="h1">
          ARABIC ALL THE TIME (AATT) PREMIUM MEMBERSHIP TERMS AND CONDITIONS
        </MainTitle>

        <ContentText sx={{ textAlign: "center", marginBottom: 3, fontWeight: "bold", color: "#666" }}>
          Last Updated: September 26, 2025
        </ContentText>

        <SectionTitle variant="h2">1. Definitions and Acceptance of Terms</SectionTitle>
        
        <SubSectionTitle variant="h3">1.1. Parties:</SubSectionTitle>
        <ContentText>
          <strong>"AATT," "We," "Us," "Our"</strong> refers to Arabic All The Time, a company based in Ontario, Canada.
        </ContentText>
        <ContentText>
          <strong>"Member," "You," "Your"</strong> refers to the individual or entity that has purchased or uses the Premium Service.
        </ContentText>
        
        <SubSectionTitle variant="h3">1.2. Premium Service:</SubSectionTitle>
        <ContentText>
          The subscription-based digital learning service offered by AATT.
        </ContentText>
        
        <SubSectionTitle variant="h3">1.3. Premium Content:</SubSectionTitle>
        <ContentText>
          All exclusive videos and digital materials provided as part of the Premium Service.
        </ContentText>
        
        <SubSectionTitle variant="h3">1.4. Acceptance:</SubSectionTitle>
        <ContentText>
          By clicking "I Agree," creating an account, or purchasing/using the Premium Service, you accept and agree to be bound by these Terms and Conditions. If you do not agree, you may not use the Premium Service.
        </ContentText>

        <SectionTitle variant="h2">2. Premium Membership and Access</SectionTitle>
        
        <SubSectionTitle variant="h3">2.1. License Grant:</SubSectionTitle>
        <ContentText>
          AATT grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Premium Service and Premium Content for your personal, non-commercial, educational use only, subject to your continued payment of the subscription fees.
        </ContentText>
        
        <SubSectionTitle variant="h3">2.2. Premium Features:</SubSectionTitle>
        <ContentText>
          An active Premium Membership currently includes, but is not limited to:
        </ContentText>
        <List>
          <ListItem>
            <ContentText>• Access to the exclusive Premium Content library of more than 60 Premium videos.</ContentText>
          </ListItem>
          <ListItem>
            <ContentText>• 1 Exclusive video added weekly.</ContentText>
          </ListItem>
          <ListItem>
            <ContentText>• Progress tracking and community forums.</ContentText>
          </ListItem>
          <ListItem>
            <ContentText>• Ability to watch designated videos offline via the AATT webapp</ContentText>
          </ListItem>
        </List>
        
        <SubSectionTitle variant="h3">2.3. Prohibited Use:</SubSectionTitle>
        <ContentText>
          You may not copy, record, redistribute, re-sell, sublicense, share your login credentials, or commercially exploit any Premium Content. Any unauthorized use is a material breach of these Terms and will result in immediate termination.
        </ContentText>

        <SectionTitle variant="h2">3. Subscription, Pricing, and Billing</SectionTitle>
        
        <SubSectionTitle variant="h3">3.1. Pricing:</SubSectionTitle>
        <ContentText>
          All fees are listed and processed in United States Dollars (USD).
        </ContentText>
        
        <SubSectionTitle variant="h3">3.2. Subscription Types and Pricing:</SubSectionTitle>
        <ContentText>
          AATT offers the following recurring Premium Subscription options:
        </ContentText>
        
        <HighlightBox>
          <ContentText>
            <strong>Subscription Type</strong> | <strong>Billing Cycle</strong> | <strong>Price (USD)</strong><br/>
            Monthly | Monthly | $9.99 USD<br/>
            Annual (Discounted) | Yearly | $71.88 USD (Equivalent to $5.99/month)
          </ContentText>
        </HighlightBox>
        
        <SubSectionTitle variant="h3">3.3. Automatic Renewal:</SubSectionTitle>
        <HighlightBox>
          <ContentText>
            <strong>YOUR SUBSCRIPTION WILL AUTOMATICALLY RENEW</strong> at the end of each Billing Cycle (monthly or annual) at the then-current non-promotional rate unless you cancel your subscription. By purchasing a subscription, you acknowledge and agree to this automatic renewal feature.
          </ContentText>
        </HighlightBox>
        
        <SubSectionTitle variant="h3">3.4. Payment Authorization:</SubSectionTitle>
        <ContentText>
          You authorize AATT to charge your designated payment method on a recurring basis for the applicable subscription fee, plus any applicable taxes, on the first day of each new Billing Cycle.
        </ContentText>
        
        <SubSectionTitle variant="h3">3.5. Price Changes:</SubSectionTitle>
        <ContentText>
          AATT reserves the right to adjust pricing at any time. We will provide you with reasonable advance notice of any change to the recurring subscription price. If you do not agree to the price change, you must cancel your subscription before the new price takes effect.
        </ContentText>

        <SectionTitle variant="h2">4. Cancellation and Refund Policy</SectionTitle>
        
        <SubSectionTitle variant="h3">4.1. Cancellation by Member:</SubSectionTitle>
        <ContentText>
          You may cancel the automatic renewal of your Premium Membership at any time through your Account Settings. The cancellation will take effect at the end of your current paid Billing Cycle. You will retain access to the Premium Service until the end of that period.
        </ContentText>
        
        <SubSectionTitle variant="h3">4.2. Annual Subscription Refunds:</SubSectionTitle>
        <ContentText>
          All Subscription fees are generally non-refundable. We do not provide refunds or credits for any partial subscription periods. Exceptions may be made in our sole discretion or as required by mandatory consumer protection law.
        </ContentText>
        
        <SubSectionTitle variant="h3">4.3. Statutory Consumer Rights (Ontario):</SubSectionTitle>
        <ContentText>
          If you are a consumer residing in Ontario, Canada, specific provisions of the Consumer Protection Act, 2002 (or its successor) may apply to your right to receive disclosure and/or cancel certain contracts, including a potential cooling-off period, where applicable. Your rights under these laws will prevail over any conflicting terms herein.
        </ContentText>
        
        <SubSectionTitle variant="h3">4.4. Termination by AATT:</SubSectionTitle>
        <ContentText>
          AATT reserves the right to terminate your account and access to the Premium Service without refund if you breach these Terms, including but not limited to payment failure, unauthorized sharing of content, or other misuse.
        </ContentText>

        <SectionTitle variant="h2">5. Disclaimer of Warranties</SectionTitle>
        
        <SubSectionTitle variant="h3">5.1. "As Is" Basis:</SubSectionTitle>
        <HighlightBox>
          <ContentText>
            <strong>THE PREMIUM SERVICE AND ALL CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</strong>
          </ContentText>
        </HighlightBox>
        
        <SubSectionTitle variant="h3">5.2. No Guarantees:</SubSectionTitle>
        <ContentText>
          <strong>AATT EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. AATT DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.</strong>
        </ContentText>

        <SectionTitle variant="h2">6. Limitation of Liability</SectionTitle>
        <HighlightBox>
          <ContentText>
            <strong>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW (INCLUDING CANADIAN AND ONTARIO CONSUMER LAWS), AATT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE PREMIUM SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE PREMIUM SERVICE; OR (C) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR CONTENT OR INFORMATION.</strong>
          </ContentText>
        </HighlightBox>
        
        <SectionTitle variant="h2">7. Indemnification</SectionTitle>
        <ContentText>
          You agree to defend, indemnify, and hold harmless AATT, its officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to legal fees) arising from: (i) your use of and access to the Premium Service; (ii) your violation of any term of these Terms; or (iii) your violation of any third-party right, including without limitation any intellectual property or privacy right.
        </ContentText>

        <SectionTitle variant="h2">8. Governing Law and Dispute Resolution</SectionTitle>
        
        <SubSectionTitle variant="h3">8.1. Governing Law:</SubSectionTitle>
        <ContentText>
          These Terms shall be governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to its conflict of law principles.
        </ContentText>
        
        <SubSectionTitle variant="h3">8.2. Exclusive Jurisdiction:</SubSectionTitle>
        <ContentText>
          You agree that any legal action or proceeding arising out of or relating to these Premium Terms shall be brought exclusively in the courts of the Province of Ontario, Canada.
        </ContentText>
        
        <SubSectionTitle variant="h3">8.3. Class Action Waiver/Arbitration:</SubSectionTitle>
        <ContentText>
          AATT may not require Ontario consumers to submit disputes to binding arbitration or to waive their right to pursue class actions under certain circumstances. This clause is subject to mandatory Ontario consumer protection laws, and nothing in these Terms is intended to limit a consumer's statutory rights under the law.
        </ContentText>
        
        <SectionTitle variant="h2">9. General Provisions</SectionTitle>
        
        <SubSectionTitle variant="h3">9.1. Entire Agreement:</SubSectionTitle>
        <ContentText>
          These Terms, together with any other legal notices and policies published by AATT, constitute the entire agreement between you and AATT concerning the Premium Service.
        </ContentText>
        
        <SubSectionTitle variant="h3">9.2. Severability:</SubSectionTitle>
        <ContentText>
          If any provision of these Terms is deemed invalid, the remaining provisions will remain in full force and effect.
        </ContentText>
        
        <SubSectionTitle variant="h3">9.3. Assignment:</SubSectionTitle>
        <ContentText>
          AATT may assign these Terms, in whole or in part, at any time without notice to you. You may not assign your rights or delegate your obligations under these Terms.
        </ContentText>
        
        <SectionTitle variant="h2">10. Contact Information</SectionTitle>
        <ContentText>
          If you have any questions about these Terms, please contact AATT at:
        </ContentText>
        <HighlightBox>
          <ContentText>
            <strong>Arabic All The Time (AATT)</strong>
            <br />
            Email: arabicallthetime@gmail.com
          </ContentText>
        </HighlightBox>
      </StyledPaper>
    </Container>
  );
}