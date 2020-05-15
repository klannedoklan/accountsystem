package com.westernacher.accountsystem.repositories;

import com.westernacher.accountsystem.models.Account;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account,String> {
    @Override
    void delete(Account account);
}
