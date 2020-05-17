package com.westernacher.accountsystem.controllers;

import com.westernacher.accountsystem.models.Account;
import com.westernacher.accountsystem.repositories.AccountRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(AccountController.class)
public class AccountControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    AccountRepository accountRepository;

    private static final Account account1 = Account.builder()
            .firstName("Test")
            .lastName("Testov")
            .email("t.testov@test.com")
            .dateOfBirth(LocalDate.of(1990, 3, 12))
            .build();

    private static final Account account2 = Account.builder()
            .firstName("Parvan")
            .lastName("Secondov")
            .email("p.sec@test.com")
            .dateOfBirth(LocalDate.of(1980, 6, 27))
            .build();

    private static final Iterable<Account> allAccounts = Arrays.asList(account1, account2);

    @Test
    public void testGetAll() throws Exception {
        Mockito.when(accountRepository.findAll()).thenReturn(allAccounts);
        mockMvc.perform(get("/accounts/all")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[0].dateOfBirth").value("1990-03-12"))
                .andExpect(jsonPath("$.[1].email").value("p.sec@test.com"));
    }
}
