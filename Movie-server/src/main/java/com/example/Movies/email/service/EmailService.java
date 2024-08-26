package com.example.Movies.email.service;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.example.Movies.email.template.EmailTemplateName;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;
    
    @Value("${spring.mail.sender}")
    private String sender;

    // @Async
    public void sendEmail(String to,String username,EmailTemplateName emailTemplate,String confirmationUrl,String activationCode,String subject) throws MessagingException {
        // Create a MimeMessage
        log.info("Attempting to send email to: {}", to);
        String templateName ;
        if(emailTemplate == null){
            templateName = "confirmation-email";
        } else {
            templateName = emailTemplate.getTemplateName();
        }
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,MimeMessageHelper.MULTIPART_MODE_MIXED,StandardCharsets.UTF_8.name());
        Map<String, Object> properties = new HashMap<>();
        properties.put("username", username);
        properties.put("confirmationUrl", confirmationUrl);
        properties.put("activationCode", activationCode);

        Context context = new Context();
        context.setVariables(properties);

        helper.setFrom(sender);
        helper.setTo(to);
        helper.setSubject(subject); 

        String template = templateEngine.process(templateName, context);
        helper.setText(template, true);

        javaMailSender.send(mimeMessage);
        log.info("Email sent successfully to: {}", to);
    }
}