package tn.iit.bank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.iit.bank.entities.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

}
