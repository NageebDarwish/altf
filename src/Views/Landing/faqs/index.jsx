import React from "react";
import FaqsCustom from "./Faqscustom";
import { Container } from "@components/common";

const Faqs = () => {

  const accordionData = [
    {
      bgColor: "#FFD9BC0D",
      heading: " About Arabic All The Time",
      header: "What is Arabic All The Time?",
      content:
        "Arabic All The Time is an immersive language acquisition platform where you acquire Arabic naturally, just like you learned your first language. By watching a library of engaging, context-rich videos, you absorb Arabic intuitively—without studying grammar rules, memorizing vocabulary lists, or completing traditional exercises.",
    },

    {
      header: "What is comprehensible input?",
      content:
        "Comprehensible input is language that is slightly above your current level of understanding but still clear enough to grasp through context. It’s the foundation of natural language acquisition, allowing you to absorb new vocabulary, grammar, and expressions intuitively—without conscious effort. As you engage with comprehensible input over time, you’ll notice your understanding deepening and your ability to use the language improving naturally, just as you did with your first language.",
    },
    {
      header: "How much does Arabic All The Time cost?",
      content: "Arabic All The Time offers both Free and Premium memberships:",
      firstli:
        "Free Account: Includes access to a curated selection of videos, progress tracking for milestones and input hours, the ability to save favorite videos for easy access, and access to community forums to connect with other acquirers and guides.",
      liheading: "Premium Membership:",
      membershipPlans: [
        "Monthly Plan: $14.99/month, which you can cancel anytime.",
        "Yearly Plan: $119.88/year (equivalent to $9.99/month), saving you 33.3%. Premium members enjoy everything in Free plus unlimited access to our video library, two exclusive new videos added daily, offline downloads, and advanced progress tracking features.",
      ],
    },
    {
      header: "What's included in the Premium subscription?",
      content:
        "Premium membership provides access to everything in Free in addition to:",
      membershipPlans: [
        "Our entire video library, covering all levels of Arabic acquisition.",
        "Two exclusive new videos added daily.",
        "Offline downloads for learning anywhere, anytime.",
        "Advanced progress tracking features.",
      ],
    },
    {
      header: "Can I cancel my Premium subscription anytime?",
      content:
        'Yes, you can cancel your Premium membership at any time. After cancellation, you’ll retain access to Premium features until the end of your current billing cycle. To cancel, simply log in to your account, go to the "Account Settings " section, and follow the prompts. If you need assistance, our support team is always here to help!',
    },
    {
      header: "Where can I watch?",
      content:
        "You can enjoy Arabic All The Time on any internet-connected device, including your computer, smartphone, or tablet. Premium users can also download videos for offline access, so you can learn wherever you are.",
    },
    {
      header: "What can I watch on Arabic All The Time?",
      content:
        "Our video library caters to all levels, from Super Beginner to Advanced. Discover content ranging from slow, beginner-friendly videos to advanced stories rich in cultural insights and real-life scenarios. The diversity of topics ensures you acquire Arabic in an intuitive, enjoyable way.",
    },
    {
      header:
        "Is Arabic All The Time suitable for complete beginners with no prior knowledge of Arabic?",
      content:
        "Absolutely! Arabic All The Time is designed to be accessible for users with no prior exposure to Arabic. Our Super Beginner videos use slow, clear speech and plenty of visual context to help you start understanding the language from day one. You don’t need any background knowledge to begin—just press play and let the natural acquisition process guide you.",
    },
    {
      header:
        "How does Arabic All The Time compare to other Arabic learning platforms?",
      content:
        "Arabic All The Time stands out by focusing on comprehensible input, a proven method for natural language acquisition. Unlike traditional platforms that emphasize grammar drills or vocabulary memorization, we offer engaging, context-rich videos that help you absorb Arabic intuitively. Think of it as learning a language the way you learned your first—by listening, understanding, and enjoying. Our unique approach combines the effectiveness of comprehensible input with cultural immersion, making language acquisition seamless and enjoyable.",
    },
    {
      header: "Is Arabic All The Time good for kids?",
      content:
        "Yes! While most of our content is designed for adults, children can also benefit from our immersive approach. The natural, intuitive method mirrors how children learn languages, making it suitable for younger audiences, provided the content aligns with their interests.",
    },

    {
      heading: "Understanding Arabic: language and culture",
      content:
        "Modern Standard Arabic (MSA) is the formal version of Arabic used in media, literature, and official settings. It serves as a universal foundation for communication across the Arab world. Dialects are regional variations spoken in daily life, with unique vocabulary, pronunciation, and grammar. All dialects share core similarities with MSA, making it an excellent starting point for Arabic Learners.",
      header:
        "What's the difference between Modern Standard Arabic and Arabic dialects?",
    },
    {
      header: "Will I learn Modern Standard Arabic or a dialect?",
      content:
        "Our primary focus is on Modern Standard Arabic (MSA), as it is widely understood across the Arab world and serves as a versatile foundation for communication. With MSA, you’ll be able to connect with nearly half a billion speakers, understand most media, and navigate professional settings. While learning a dialect can be useful for specific regions, MSA provides the best starting point.",
    },
    {
      header:
        "Will I learn cultural aspects of the Arab world on this platform?",
      content:
        "Absolutely! Arabic All The Time integrates cultural insights into every video, highlighting everyday life, traditions, and nuances from across the Arab world. Understanding culture is an essential part of language acquisition, and our content ensures you gain both linguistic and cultural fluency.",
    },
    {
      header:
        "Can I use Arabic All The Time without knowing the Arabic alphabet?",
      content:
        "Yes, you can! Arabic All The Time is designed to help you acquire Arabic through listening and understanding spoken language. Learning the alphabet can be helpful later, but it’s not necessary to start your journey with comprehensible input. Focus on listening and building comprehension first, and the alphabet will feel easier to learn when you’re ready. Check our Approach page for more details.",
    },

    {
      bgColor: "#7AD9F10D",
      heading: "Learning approach and methodology",
      header: "How does Arabic All The Time work?",
      content:
        "Arabic All The Time uses the comprehensible input approach, allowing you to absorb the language naturally by watching engaging, context-rich videos. With consistent exposure, you acquire vocabulary, grammar, and pronunciation intuitively—without studying rules or memorizing lists.",
    },
    {
      header: "How long will it take me to become fluent?",
      content:
        "Fluency depends on the number of hours of comprehensible input you accumulate:",
      membershipPlans: [
        "20 Hours: You’ll start feeling more comfortable with the language.",
        "200 Hours: You’ll follow focused, slow-paced content with ease",
        "1,000 Hours: You’ll understand most native media and can start speaking.",
        "Consistency and dedication are key—daily exposure accelerates progress.",
      ],
    },
    {
      header: "Do I need to study grammar?",
      content:
        "No, studying grammar isn’t necessary and can sometimes even be harmful. Just as children acquire their first language, you’ll absorb Arabic grammar naturally through exposure. Over time, you’ll start using correct grammar intuitively, without needing to consciously study rules.",
    },
    {
      header: "Will I need to memorize vocabulary?",
      content:
        "No, vocabulary sticks naturally through repeated exposure in different contexts. By watching videos consistently, words and phrases will become part of your understanding without the need for memorization.",
    },
    {
      header: "Do I need to take notes while watching videos?",
      content:
        "No, you should avoid taking notes as it can disrupt your listening. Simply enjoy the videos and focus on understanding the overall message. Trust the process—your brain will absorb the language naturally.",
    },
    {
      header: "Can watching with subtitles help, or should I avoid them?",
      content:
        "Avoid subtitles in your native language, as they can distract from listening to Arabic. However, Arabic subtitles can be helpful for advanced acquirers looking to improve their recognition of written Arabic. For beginners and intermediate acquirers, relying on visuals and context is more effective for natural language absorption.",
    },
    {
      header: "What should I do if I don't understand everything in a video?",
      content:
        "It’s normal not to understand every word. Focus on the overall meaning, as your brain will naturally fill in the gaps over time. Gradual exposure to context-rich content ensures effective language acquisition.",
    },
    {
      header:
        "Can I listen to Arabic All The Time videos passively in the background?",
      content:
        "Active listening is the most effective way to acquire Arabic, especially in the early stages. Focused attention helps your brain connect meaning to words and phrases, which is essential for language acquisition. While passive listening can familiarize you with the rhythm and sounds of Arabic, real progress comes from active listening and comprehension.",
    },
    {
      header: "When and how will I start speaking Arabic?",
      content:
        "Speaking will emerge naturally after absorbing enough comprehensible input. This occurs at different milestones in your journey, so celebrate it when it happens, but don’t force it too early. We recommend focusing on listening and comprehension until you’ve received approximately 1,000 hours of input. Before that, you may naturally begin to say words or phrases—feel free to use them, but avoid pressuring yourself to practice speaking prematurely. Forcing speech too soon can lead to borrowing the speaking patterns of your native language, which will lead you to have unclear pronunciation. Trust the process, and you’ll intuitively form sentences based on the speaking patterns and structures you’ve absorbed.",
    },
    {
      header: "Should I practice reading too?",
      content:
        "Reading is a valuable immersion tool but is most effective after you’ve built a strong foundation of listening and comprehension through comprehensible input. Starting to read too early may cause your brain to borrow incorrect pronunciation patterns from your native language. Focus first on absorbing the sounds and rhythm of Arabic. Once you’re comfortable, add reading and writing if they align with your personal goals or interests.",
    },
    {
      heading: "Practical Questions for Learning Arabic",
      content:
        "Yes! The language and cultural insights you gain from our videos will help you navigate Arabic-speaking regions confidently. You’ll understand basic conversations, ask questions, and feel more at ease during your travels.",
      header:
        "Can Arabic All The Time prepare me for travel in Arabic-speaking countries?",
    },
    {
      header:
        "How can I use Arabic All The Time to learn specific topics or vocabulary?",
      content:
        "Our content is categorized by topics such as travel, culture, and daily life, allowing you to focus on specific areas of interest. For example, if you’re preparing for a trip, explore videos on conversational phrases or cultural customs. As you watch, you’ll naturally pick up vocabulary and expressions related to your chosen themes without deliberate memorization.",
    },
    {
      header: "How will I know if I’m making progress?",
      content:
        "Progress happens gradually and may feel subtle at first. You’ll start recognizing familiar words and phrases more frequently, following longer conversations, and grasping complex ideas with less effort. Over time, Arabic will feel more intuitive, and you’ll find yourself understanding content that once seemed challenging. Check our Approach page for more details.",
    },
    {
      header: "How should I track my progress?",
      content:
        "The best way to measure progress is by tracking the hours of comprehensible input you’ve received—not by counting days, months, or years. Focus on consistent exposure to meaningful, context-rich content. The more input you receive, the faster you’ll progress.",
    },
    {
      header:
        "Can I use Arabic All The Time with other methods or formal courses?",
      content:
        "Comprehensible input is the easiest, fastest, and most effective way to achieve lasting fluency in Arabic. We recommend that you focus entirely on receiving comprehensible input through videos, podcasts, audiobooks, reading, or crosstalk. When it comes to language learning, deliberate practice can lead to some irreversible faulty habits.",
    },
    {
      bgColor: "#DBFFDF1A",
      heading: " Advanced language learning",
      content:
        "Not at all! Arabic All The Time offers content for all levels, from Super Beginner to Advanced. Even if you have a background in Arabic, comprehensible input can power your language acquisition and help you achieve a lasting fluency faster.",
      header:
        "I already know some Arabic. Will this method be too basic for me?",
    },
    {
      header: "How will I know if my listening skills are improving?",
      content:
        "You’ll notice progress as you begin understanding longer sentences, following conversations more easily, and recognizing words and phrases with less effort. Over time, listening comprehension will feel more intuitive, and Arabic will start to “click.”",
    },
    {
      header: "Will I eventually reach native-level fluency with this method?",
      content:
        "Absolutely! With consistent exposure, you will achieve lasting fluency. Check our Approach page for more details.",
    },
    {
      header: "What should I do once I feel fluent?",
      content:
        "Continue engaging with comprehensible input and look for opportunities to immerse yourself further. Conversations with native speakers, Arabic media, and real-life experiences will deepen your skills. Language acquisition is a lifelong journey, and ongoing exposure ensures continuous growth.",
    },
    {
      heading: " Community and feedback",
      header: "Can I suggest video topics or content ideas?",
      content:
        "Absolutely! We love hearing from our Community and welcome your ideas. You can share feedback or suggest topics through the comments section or our Contact page. Your input helps us create content that meets your needs and enriches the platform.",
    },
    {
      header: "What should I do if I start losing motivation?",
      content:
        "It’s natural for motivation to ebb and flow. Try setting small, manageable goals, like watching one video daily or tracking your input hours to see your progress. Remind yourself that language acquisition is a journey—every minute of exposure brings you closer to fluency. Celebrate small milestones to keep your momentum going and make the process enjoyable.",
    },
    {
      header: "What should I do if I feel frustrated or overwhelmed?",
      content:
        "Feeling frustrated is a normal part of language acquisition, especially when challenging yourself. If you feel overwhelmed, take a step back and return to videos that are easier to understand. Progress is gradual, and every video enhances your comprehension over time. Trust the process, celebrate small wins, enjoy the journey, and before you know it, you will be fluent in Arabic.",
    },
  ];

  return (
    <>
      <div className="bg-white">
        <Container className="py-8 md:py-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <h1 className="font-pally text-2xl sm:text-[32px] md:text-[40px] lg:text-[56px] xl:text-[72px] font-bold text-heading text-center sm:text-left">
              Frequently asked questions
            </h1>
            <img
              src="/questions.png"
              alt="FAQ Questions"
              className="h-16 w-auto sm:h-20 md:h-24 lg:h-28 xl:h-32 sm:w-auto"
            />
          </div>

          <div className="mt-8 md:mt-12">
            <FaqsCustom accordionData={accordionData} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Faqs;
